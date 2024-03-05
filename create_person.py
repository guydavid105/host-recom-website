from neo4j import GraphDatabase
import json
import hashlib
import sys

# Information for connecting to the cloud database
URI = "neo4j+s://a95b4e85.databases.neo4j.io"
AUTH = ("neo4j", "UeOScs4TOfJaBrud12W8o99dhbzWPrOJtJvDUdZSkEU")

Cloud_password = "UeOScs4TOfJaBrud12W8o99dhbzWPrOJtJvDUdZSkEU"
Circle_ci_password = "kG$9chhy#.tZkXt"


class Database:

    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))  # Initialises connection to the database
        self.driver.verify_connectivity()  # Verifies the connection to the database

    def close(self):
        self.driver.close()  # Allows us to close the connection when finished

    def create_entity(self, title, entity_type, primary_id, img, date):
        session = self.driver.session()  # Creates a session for us to run the queries in
        # Merge should not replace it if it already exists
        session.run("MERGE (e:entity{title: $title, type: $entity_type, id: $primary_id, img: $img, date:$date})", title=title, entity_type=entity_type, primary_id=primary_id, img=img, date=date)
        session.close()

    def delete_entity(self, entity_type, primary_id):
        session = self.driver.session()  # Creates a session to run the queries in

        # Deletes any nodes with that title and type
        if entity_type == "person":
            session.run("MATCH (p:person{user_id: $primary_id}) DETACH DELETE p", primary_id=primary_id)
        else:
            session.run("MATCH (e:entity{type: $entity_type,id: $primary_id}) DETACH DELETE e", primary_id=primary_id, entity_type=entity_type)
        session.close()

    def delete_link(self, user_id, entity_type, primary_id):
        session = self.driver.session()
        session.run("MATCH (p:person{user_id: $user_id})-[r:likes]->(e:entity{type: $entity_type, id: $primary_id}) DELETE r", user_id=user_id, entity_type=entity_type, primary_id=primary_id)
        session.close()

    # Makes sure that all entities mentioned exist.
    def process_links(self, links):
        session = self.driver.session()
        for i in range(len(links)):
            if links[i][5] is None:
                links[i][5] = "None"
            session.run("MERGE (e:entity{title: $title, type: $entity_type, id: $primary_id, img: $img, date:$date})", title=links[i][0], entity_type=links[i][1], primary_id=links[i][2], img=links[i][4], date=links[i][5])
        session.close()
        return links

    def generate_user_id(self, credentials):
        # This hashes the credentials into a potential user_id
        m = hashlib.md5()
        m.update((''.join(credentials)).encode('utf-8'))
        potential_user_id = int(str(int(m.hexdigest(), 16))[0:12])
        session = self.driver.session()
        exists = True
        x = 0
        while exists:
            potential_user_id += x**2
            # This checks if there is already a person with this user_id if it is then the potential_user_id will be incremented and will try again
            exists = session.run("MATCH (p:person {user_id: $potential_user_id}) WITH COUNT(p) > 0  as node_exists RETURN node_exists", potential_user_id=potential_user_id)
            for node in exists:
                exists = node['node_exists']  # extracts value from exists object into just a bool exists value
                break
            x += 1
        # Returns potential user id once
        return potential_user_id

    def create_person(self, user_credentials, links):
        # Links should be a list of (title, type) pairs that user_id likes
        session = self.driver.session()
        # Makes sure all entities exist
        links = self.process_links(links)

        # Checks if the person already exists
        exists = session.run("MATCH (p:person {spotify_id: $spotify_id, goodreads_id: $goodreads_id, letterboxd_id: $letterboxd_id}) WITH COUNT(p) > 0  as node_exists RETURN node_exists", spotify_id=user_credentials[0], goodreads_id=user_credentials[1], letterboxd_id=user_credentials[2])
        for node in exists:
            exists = node['node_exists']  # extracts value from exists object into just a bool exists value
            break

        if not exists:
            # Generate a unique user id
            user_id = self.generate_user_id(user_credentials)
            # Create the Person
            session.run("CREATE (p:person{user_id: $user_id,spotify_id: $spotify_id, goodreads_id: $goodreads_id, letterboxd_id: $letterboxd_id})", user_id=user_id, spotify_id=user_credentials[0], goodreads_id=user_credentials[1], letterboxd_id=user_credentials[2])
            for title, entity_type, primary_id, weight, img, date in links:
                # Create the link to the entity
                session.run("MATCH (p:person{user_id: $user_id}),(e:entity{type: $entity_type, id: $primary_id}) CREATE (p)-[:likes{weight: $weight}]->(e)", user_id=user_id, entity_type=entity_type, weight=weight, primary_id=primary_id)
        else:
            # get the user_id matching these accounts
            user_id = session.run("MATCH (p:person{spotify_id: $spotify_id, goodreads_id: $goodreads_id, letterboxd_id: $letterboxd_id}) return p.user_id", spotify_id=user_credentials[0], goodreads_id=user_credentials[1], letterboxd_id=user_credentials[2])

            # extract the value returned from the query
            for ids in user_id:
                for ids2 in ids:
                    user_id = ids2
                    break
                break

            # Then do the same thing but...
            for title, entity_type, primary_id, weight, img, date in links:
                exists = session.run("MATCH (p:person {user_id: $user_id}) -[:likes]->(e:entity{type: $entity_type, id: $primary_id}) WITH COUNT(p) > 0 as link_exists return link_exists", user_id=user_id, entity_type=entity_type, primary_id=primary_id)

                for node in exists:
                    exists = node['link_exists']
                    break
                # Make sure the link doesn't already exist
                if exists:
                    # Make sure the weight hasn't been updated
                    weight_exists = session.run("MATCH (p:person {user_id: $user_id}) -[:likes{weight: $weight}]->(e:entity{type: $entity_type, id: $primary_id}) WITH COUNT(p) > 0 as link_exists return link_exists", user_id=user_id, entity_type=entity_type, weight=weight, primary_id=primary_id)

                    for node in weight_exists:
                        weight_exists = node['link_exists']
                        break
                    if not weight_exists:
                        self.delete_link(user_id, entity_type, primary_id)
                else:
                    weight_exists = False

                # If it doesn't then we can create it.
                if not weight_exists:
                    session.run("MATCH (p:person{user_id: $user_id}),(e:entity{type: $entity_type, id: $primary_id}) CREATE (p)-[:likes{weight: $weight}]->(e)", user_id=user_id, entity_type=entity_type, weight=weight, primary_id=primary_id)
            session.close()


def read_json(file_path, entity_type):
    with open(file_path) as input_file:
        # Read in the JSON file and turn it into a python dictionary
        file_contents = input_file.read()
        parsed_contents = json.loads(file_contents)

        links = []
        total_rating = 0
        number_rated = 0

        if parsed_contents:
            parsed_contents.pop(0)
        # Calculate the average rating given, so we can set this as default value for non-rated movies
        for entity in parsed_contents:
            if entity['rating'] != '' and entity['rating'] is not None:
                total_rating += float(entity['rating'])
                number_rated += 1

        if number_rated == 0:
            average_rating = 2.5
        else:
            average_rating = round((total_rating / number_rated)*10) / 10

        # Append each movie to the list with the right ratings
        for entity in parsed_contents:
            if entity['rating'] == '' or entity['rating'] is None:
                links.append([entity['title'], entity_type, entity['uid'], average_rating, entity['img'], entity['year']])
                # links.append((entity['title'], entity_type, int(entity['uid']), average_rating, entity['img'], "15/12/03"))
            else:
                links.append([entity['title'], entity_type, entity['uid'], float(entity['rating']), entity['img'], entity['year']])
                # links.append((entity['title'], entity_type, int(entity['uid']), float(entity['rating']), entity['img'], "15/12/03"))
        return links


def get_id(json_file):
    with open(json_file) as input_file:
        file_contents = input_file.read()
        parsed_contents = json.loads(file_contents)
        if parsed_contents:
            return parsed_contents.pop(0)['username']
        else:
            return ""


def input_json(letterbox_json, spotify_json, goodreads_json):
    # Get all ids and gather into one variable
    letterbox_id = get_id(letterbox_json)
    spotify_id = get_id(spotify_json)
    goodreads_id = get_id(goodreads_json)
    user_credentials = (spotify_id, goodreads_id, letterbox_id)

    # Grab all the links in all the Jsons into one list called link
    links = read_json(letterbox_json, "movie")
    links.extend(read_json(spotify_json, "song"))
    links.extend(read_json(goodreads_json, "book"))

    # Create the person with these links
    database = Database(URI, AUTH[0], AUTH[1])
    database.create_person(user_credentials, links)
    database.close()


def re_input_movie_data():
    json_files = ['jay_film_data.json', 'kurstboy_film_data.json', 'mistat_film_data.json', 'schaffrillas_film_data.json']
    for letterbox_file in json_files:
        input_json(letterbox_file, 'empty.json', 'empty.json')
        print(letterbox_file)


def re_input_book_data():
    json_files = ['22106879-jayson_book_data.json', '2969647-maciek_book_data.json', '4527753-khanh-first-of-her-name-mother-of-bunnies_book_data.json', '16254355-matthew_book_data.json', '47207032-chelsea-humphrey_book_data.json', '63998707-fizah-books-tales-by-me_book_data.json', '71848701-miranda-reads_book_data.json']
    for goodreads_file in json_files:
        input_json('empty.json', 'empty.json', goodreads_file)
        print(goodreads_file)


def standard_execution():
    if len(sys.argv) != 4:
        raise Exception("Please enter file paths for all accounts, if no account send empty JSON file. Example usage: python main.py <letterbox_json> <spotify_json> <goodreads_json> ")
    else:
        input_json(sys.argv[1], sys.argv[2], sys.argv[3])


standard_execution()
# print("Python")
# re_input_book_data()
# re_input_movie_data()

# database = Database(URI, AUTH[0], AUTH[1])
# database.create_entity("test", "test", "test", "test", "test")
# database.close()
