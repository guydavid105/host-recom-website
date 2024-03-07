package com.example.springbootdatabaseconn.repositories;

import com.example.springbootdatabaseconn.models.entity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;

public interface entityRepository extends Neo4jRepository<entity, Long> {
    @Query("MATCH (p:person)-[:likes]->(entities:entity) WHERE p.user_id = $id RETURN entities")
    List<entity> findEntitiesByPersonId(@Param("id") Long id);

    @Query("""
            MATCH (p1:person {user_id: $user_id})-[x:likes]->(m:entity)<-[y:likes]-(p2:person)
            WITH COUNT(m) AS numbershows, SUM(x.weight * y.weight) AS xyDotProduct,
            SQRT(REDUCE(xDot = 0.0, a IN COLLECT(x.weight) | xDot + a^2)) AS xLength,
            SQRT(REDUCE(yDot = 0.0, b IN COLLECT(y.weight) | yDot + b^2)) AS yLength,
            p1, p2
            WITH p1, p2, xyDotProduct/(xLength*yLength) AS sim
            ORDER BY sim DESC, p2.user_id WITH p1,p2, COLLECT(p2)[0..50] as neighbours
            UNWIND neighbours as neighbour WITH p1, neighbour
            MATCH (neighbour)-[l:likes]->(e:entity)
            WHERE not (p1)-[:likes]->(e:entity)
            WITH p1, e, COUNT(DISTINCT neighbour) as countnns, avg(l.weight) as ratings
            ORDER BY p1.user_id, ratings DESC, countnns DESC
            WITH COLLECT(e)[0..15] as recommendations
            UNWIND(recommendations) as res
            RETURN res""")
    List<entity> findRecommendationsByPersonId(@Param("user_id") Long user_id);

    @Query("""
            MATCH (p1: person{user_id: $user_id})-[:likes]->(e:entity)<-[:likes]-(p2:person)
            WHERE p1<>p2
            WITH p1, p2, COUNT(DISTINCT e) as shared_items

            MATCH (p:person)-[:likes]->(e:entity)
            WHERE p in [p1,p2]
            WITH p1, p2, shared_items, COUNT(DISTINCT e) as distinct_items

            WITH p1, p2, shared_items, distinct_items, (shared_items*1.0/distinct_items) as jaccard_index

            ORDER BY jaccard_index DESC, p2.user_id WITH p1,p2, COLLECT(p2)[0..5] as neighbours
            UNWIND neighbours as neighbour WITH p1, neighbour

            MATCH (neighbour)-[:likes]->(e:entity)
            WHERE not (p1)-[:likes]->(e:entity)
            WITH p1, e, COUNT(DISTINCT neighbour) as countnns
            ORDER BY p1.user_id, countnns DESC
            WITH COLLECT(e)[0..15] as recommendations
            UNWIND(recommendations) as res
            RETURN res""")
    List<entity> findRecommendationsByPersonIdNoWeights(@Param("user_id") Long user_id);

    @Query("MATCH (e:entity) WHERE e.title = $title AND e.type = \"song\" RETURN e")
    List<entity> findSongByTitle(@Param("title") String title);

    @Query("MATCH (e:entity) WHERE e.title = $title AND e.type = \"movie\" RETURN e")
    List<entity> findMovieByTitle(@Param("title") String title);

    @Query("MATCH (e:entity) WHERE e.title = $title AND e.type = \"book\" RETURN e")
    List<entity> findBookByTitle(@Param("title") String title);

    @Query("""
            MATCH (p1:person {user_id: $user_id})-[x:likes]->(m:entity)<-[y:likes]-(p2:person)
            WITH COUNT(m) AS numbershows, SUM(x.weight * y.weight) AS xyDotProduct,
            SQRT(REDUCE(xDot = 0.0, a IN COLLECT(x.weight) | xDot + a^2)) AS xLength,
            SQRT(REDUCE(yDot = 0.0, b IN COLLECT(y.weight) | yDot + b^2)) AS yLength,
            p1, p2
            WITH p1, p2, xyDotProduct/(xLength*yLength) AS sim
            ORDER BY sim DESC, p2.user_id WITH p1,p2, COLLECT(p2)[0..5] as neighbours
            UNWIND neighbours as neighbour WITH p1, neighbour
            MATCH (neighbour)-[:likes]->(e:entity {type: 'movie'})
            WHERE not (p1)-[:likes]->(e:entity)
            WITH p1, e, COUNT(DISTINCT neighbour) as countnns
            ORDER BY p1.user_id, countnns DESC
            WITH COLLECT(e)[0..10] as recommendations
            UNWIND(recommendations) as res
            RETURN res""")
    List<entity> findMovieRecommendations(@Param("user_id") Long user_id);

    @Query("""
            MATCH (p1:person {user_id: $user_id})-[x:likes]->(m:entity)<-[y:likes]-(p2:person)
            WITH COUNT(m) AS numbershows, SUM(x.weight * y.weight) AS xyDotProduct,
            SQRT(REDUCE(xDot = 0.0, a IN COLLECT(x.weight) | xDot + a^2)) AS xLength,
            SQRT(REDUCE(yDot = 0.0, b IN COLLECT(y.weight) | yDot + b^2)) AS yLength,
            p1, p2
            WITH p1, p2, xyDotProduct/(xLength*yLength) AS sim
            ORDER BY sim DESC, p2.user_id WITH p1,p2, COLLECT(p2)[0..5] as neighbours
            UNWIND neighbours as neighbour WITH p1, neighbour
            MATCH (neighbour)-[:likes]->(e:entity {type: 'book'})
            WHERE not (p1)-[:likes]->(e:entity)
            WITH p1, e, COUNT(DISTINCT neighbour) as countnns
            ORDER BY p1.user_id, countnns DESC
            WITH COLLECT(e)[0..10] as recommendations
            UNWIND(recommendations) as res
            RETURN res""")
    List<entity> findBookRecommendations(@Param("user_id") Long user_id);

    @Query("""
            MATCH (p1:person {user_id: $user_id})-[x:likes]->(m:entity)<-[y:likes]-(p2:person)
            WITH COUNT(m) AS numbershows, SUM(x.weight * y.weight) AS xyDotProduct,
            SQRT(REDUCE(xDot = 0.0, a IN COLLECT(x.weight) | xDot + a^2)) AS xLength,
            SQRT(REDUCE(yDot = 0.0, b IN COLLECT(y.weight) | yDot + b^2)) AS yLength,
            p1, p2
            WITH p1, p2, xyDotProduct/(xLength*yLength) AS sim
            ORDER BY sim DESC, p2.user_id WITH p1,p2, COLLECT(p2)[0..5] as neighbours
            UNWIND neighbours as neighbour WITH p1, neighbour
            MATCH (neighbour)-[:likes]->(e:entity {type: 'song'})
            WHERE not (p1)-[:likes]->(e:entity)
            WITH p1, e, COUNT(DISTINCT neighbour) as countnns
            ORDER BY p1.user_id, countnns DESC
            WITH COLLECT(e)[0..10] as recommendations
            UNWIND(recommendations) as res
            RETURN res""")
    List<entity> findSongRecommendations(@Param("user_id") Long user_id);

    @Query("""
            WITH $titles as items
            MATCH (e:entity)
            WHERE any(word IN items WHERE e.title CONTAINS word)
            WITH e
            CREATE (p1:person{user_id: -1, spotify_id: "", goodreads_id: "", letterbox_id: ""})-[:likes {weight: 100}]->(e)
            WITH p1
            MATCH (p1) -[x:likes]->(m:entity)<-[y:likes]-(p2:person)
            WITH COUNT(m) AS numbershows, SUM(x.weight * y.weight) AS xyDotProduct,
            SQRT(REDUCE(xDot = 0.0, a IN COLLECT(x.weight) | xDot + a^2)) AS xLength,
            SQRT(REDUCE(yDot = 0.0, b IN COLLECT(y.weight) | yDot + b^2)) AS yLength,
            p1, p2
            WITH p1, p2, xyDotProduct/(xLength*yLength) AS sim
            ORDER BY sim DESC, p2.user_id WITH p1,p2, COLLECT(p2)[0..10] as neighbours
            UNWIND neighbours as neighbour WITH p1, neighbour
            MATCH (neighbour)-[:likes]->(e:entity {type: "movie"})
            WHERE not (p1)-[:likes]->(e:entity)
            WITH p1, e, COUNT(DISTINCT neighbour) as countnns
            DETACH DELETE p1
            WITH e, countnns
            ORDER BY countnns DESC
            WITH COLLECT(e)[0..10] as recommendations
            UNWIND(recommendations) as res
            RETURN res""")
    List<entity>findMovieRecommendationsNoIds (@Param("titles") List<String> titles);

    @Query("""
            WITH $titles as items
            MATCH (e:entity)
            WHERE any(word IN items WHERE e.title CONTAINS word)
            WITH e
            CREATE (p1:person{user_id: -1, spotify_id: "", goodreads_id: "", letterbox_id: ""})-[:likes {weight: 100}]->(e)
            WITH p1
            MATCH (p1) -[x:likes]->(m:entity)<-[y:likes]-(p2:person)
            WITH COUNT(m) AS numbershows, SUM(x.weight * y.weight) AS xyDotProduct,
            SQRT(REDUCE(xDot = 0.0, a IN COLLECT(x.weight) | xDot + a^2)) AS xLength,
            SQRT(REDUCE(yDot = 0.0, b IN COLLECT(y.weight) | yDot + b^2)) AS yLength,
            p1, p2
            WITH p1, p2, xyDotProduct/(xLength*yLength) AS sim
            ORDER BY sim DESC, p2.user_id WITH p1,p2, COLLECT(p2)[0..10] as neighbours
            UNWIND neighbours as neighbour WITH p1, neighbour
            MATCH (neighbour)-[:likes]->(e:entity {type: "book"})
            WHERE not (p1)-[:likes]->(e:entity)
            WITH p1, e, COUNT(DISTINCT neighbour) as countnns
            DETACH DELETE p1
            WITH e, countnns
            ORDER BY countnns DESC
            WITH COLLECT(e)[0..10] as recommendations
            UNWIND(recommendations) as res
            RETURN res""")
    List<entity>findBookRecommendationsNoIds (@Param("titles") List<String> titles);

    @Query("""
            WITH $titles as items
            MATCH (e:entity)
            WHERE any(word IN items WHERE e.title CONTAINS word)
            WITH e
            CREATE (p1:person{user_id: -1, spotify_id: "", goodreads_id: "", letterbox_id: ""})-[:likes {weight: 100}]->(e)
            WITH p1
            MATCH (p1) -[x:likes]->(m:entity)<-[y:likes]-(p2:person)
            WITH COUNT(m) AS numbershows, SUM(x.weight * y.weight) AS xyDotProduct,
            SQRT(REDUCE(xDot = 0.0, a IN COLLECT(x.weight) | xDot + a^2)) AS xLength,
            SQRT(REDUCE(yDot = 0.0, b IN COLLECT(y.weight) | yDot + b^2)) AS yLength,
            p1, p2
            WITH p1, p2, xyDotProduct/(xLength*yLength) AS sim
            ORDER BY sim DESC, p2.user_id WITH p1,p2, COLLECT(p2)[0..10] as neighbours
            UNWIND neighbours as neighbour WITH p1, neighbour
            MATCH (neighbour)-[:likes]->(e:entity {type: "song"})
            WHERE not (p1)-[:likes]->(e:entity)
            WITH p1, e, COUNT(DISTINCT neighbour) as countnns
            DETACH DELETE p1
            WITH e, countnns
            ORDER BY countnns DESC
            WITH COLLECT(e)[0..10] as recommendations
            UNWIND(recommendations) as res
            RETURN res""")
    List<entity>findSongRecommendationsNoIds (@Param("titles") List<String> titles);
}
