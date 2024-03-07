package com.example.springbootdatabaseconn.controllers;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import com.example.springbootdatabaseconn.services.PersonService;
import com.example.springbootdatabaseconn.models.person;
import com.example.springbootdatabaseconn.models.entity;
import com.example.springbootdatabaseconn.services.entityService;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/v1/people")
public class PersonController {
    private final PersonService personService;
    private final entityService entityService;

    public PersonController(PersonService personService, entityService entityService){
        this.personService = personService;
        this.entityService = entityService;
    }

    @GetMapping("/")
    public ResponseEntity<List<person>> personIndex() {
        return new ResponseEntity<>(personService.getAllPeople(), HttpStatus.OK);
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<List<entity>> personEntities(@PathVariable Long user_id) {
        return new ResponseEntity<>(entityService.getAllEntitiesById(user_id), HttpStatus.OK);
    }

    @GetMapping("/test/{title}")     //doesn't work
    public ResponseEntity<List<person>> personByEntities(@PathVariable String title) {
        return new ResponseEntity<>(personService.getPeopleByEntityId(title), HttpStatus.OK);
    }

    @GetMapping("recomm/test/{user_id}")
    public ResponseEntity<List<entity>> recommendations(@PathVariable Long user_id) {
        return new ResponseEntity<>(entityService.get15RecommendationsByPersonId(user_id), HttpStatus.OK);
    }

    @GetMapping("recomm/no-weights/{user_id}")
    public ResponseEntity<List<entity>> recommendations_no_weights(@PathVariable Long user_id) {
        return new ResponseEntity<>(entityService.get15RecommendationsByPersonIdNoWeights(user_id), HttpStatus.OK);
    }

    @GetMapping("find-by-letterboxd-id/{letterboxd_id}")
    public ResponseEntity<List<person>> person_by_letterboxd_id(@PathVariable String letterboxd_id) {
        return new ResponseEntity<>(personService.getPersonByLetterboxdId(letterboxd_id), HttpStatus.OK);
    }

    @GetMapping("find-by-spotify-id/{spotify_id}")
    public ResponseEntity<List<person>> person_by_spotify_id(@PathVariable String spotify_id) {
        return new ResponseEntity<>(personService.getPersonBySpotifyId(spotify_id), HttpStatus.OK);
    }

    @GetMapping("find-by-goodreads-id/{goodreads_id}")
    public ResponseEntity<List<person>> person_by_goodreads_id(@PathVariable String goodreads_id) {
        return new ResponseEntity<>(personService.getPersonByGoodreadsId(goodreads_id), HttpStatus.OK);
    }

    @GetMapping("find-song-by-title/{title}")
    public ResponseEntity<List<entity>> song_by_title(@PathVariable String title) {
        return new ResponseEntity<>(entityService.getSongByTitle(title), HttpStatus.OK);
    }

    @GetMapping("find-movie-by-title/{title}")
    public ResponseEntity<List<entity>> movie_by_title(@PathVariable String title) {
        return new ResponseEntity<>(entityService.getMovieByTitle(title), HttpStatus.OK);
    }

    @GetMapping("find-book-by-title/{title}")
    public ResponseEntity<List<entity>> book_by_title(@PathVariable String title) {
        return new ResponseEntity<>(entityService.getBookByTitle(title), HttpStatus.OK);
    }

    @GetMapping("recomm/movie/{user_id}")
    public ResponseEntity<List<entity>> movie_recommendations(@PathVariable Long user_id) {
        return new ResponseEntity<>(entityService.getMovieRecommendations(user_id), HttpStatus.OK);
    }

    @GetMapping("recomm/book/{user_id}")
    public ResponseEntity<List<entity>> book_recommendations(@PathVariable Long user_id) {
        return new ResponseEntity<>(entityService.getBookRecommendations(user_id), HttpStatus.OK);
    }

    @GetMapping("recomm/song/{user_id}")
    public ResponseEntity<List<entity>> song_recommendations(@PathVariable Long user_id) {
        return new ResponseEntity<>(entityService.getSongRecommendations(user_id), HttpStatus.OK);
    }

    @GetMapping("recomm-no-id/movie/{title1}/{title2}/{title3}/{title4}/{title5}")
    public ResponseEntity<List<entity>> movie_recommendations_no_id(@PathVariable String title1, @PathVariable String title2, @PathVariable String title3, @PathVariable String title4, @PathVariable String title5) {
        List<String> titles = new ArrayList<String>();
        if (!Objects.equals(title1, "-")) {
            titles.add(title1);
        }
        if (!Objects.equals(title2, "-")) {
            titles.add(title2);
        }
        if (!Objects.equals(title3, "-")) {
            titles.add(title3);
        }
        if (!Objects.equals(title4, "-")) {
            titles.add(title5);
        }
        if (!Objects.equals(title5, "-")) {
            titles.add(title5);
        }

        return new ResponseEntity<>(entityService.getMovieRecommendationsNoId(titles), HttpStatus.OK);
    }

    @GetMapping("recomm-no-id/book/{title1}/{title2}/{title3}/{title4}/{title5}")
    public ResponseEntity<List<entity>> book_recommendations_no_id(@PathVariable String title1, @PathVariable String title2, @PathVariable String title3, @PathVariable String title4, @PathVariable String title5) {
        List<String> titles = new ArrayList<String>();
        if (!Objects.equals(title1, "-")) {
            titles.add(title1);
        }
        if (!Objects.equals(title2, "-")) {
            titles.add(title2);
        }
        if (!Objects.equals(title3, "-")) {
            titles.add(title3);
        }
        if (!Objects.equals(title4, "-")) {
            titles.add(title5);
        }
        if (!Objects.equals(title5, "-")) {
            titles.add(title5);
        }

        return new ResponseEntity<>(entityService.getBookRecommendationsNoId(titles), HttpStatus.OK);
    }

    @GetMapping("recomm-no-id/song/{title1}/{title2}/{title3}/{title4}/{title5}")
    public ResponseEntity<List<entity>> song_recommendations_no_id(@PathVariable String title1, @PathVariable String title2, @PathVariable String title3, @PathVariable String title4, @PathVariable String title5) {
        List<String> titles = new ArrayList<String>();
        if (!Objects.equals(title1, "-")) {
            titles.add(title1);
        }
        if (!Objects.equals(title2, "-")) {
            titles.add(title2);
        }
        if (!Objects.equals(title3, "-")) {
            titles.add(title3);
        }
        if (!Objects.equals(title4, "-")) {
            titles.add(title5);
        }
        if (!Objects.equals(title5, "-")) {
            titles.add(title5);
        }

        return new ResponseEntity<>(entityService.getSongRecommendationsNoId(titles), HttpStatus.OK);
    }

    @PostMapping("/post-spotify/{goodreads_id}/{letterboxd_id}")
    public ResponseEntity<ArrayList<entity>> addUser(@RequestBody List<Map<String, String>> spotify_body, @PathVariable String goodreads_id, @PathVariable String letterboxd_id) throws IOException, InterruptedException {
        String spotify_id;
        if (spotify_body.isEmpty()) {
            spotify_id = "-";
        } else {
            spotify_id = spotify_body.get(0).get("username");
        }

        if (!Objects.equals(spotify_id, "-")) {
            String spotify_file_path = String.format("C:\\Users\\guyda\\group_project\\1b_group_project\\%s_song_data.json", spotify_id);
            File spotify_json = new File(spotify_file_path);
            FileWriter fw = new FileWriter(spotify_file_path);

            String json = new Gson().toJson(spotify_body);
            fw.write(json);
            fw.flush();
            fw.close();
        }

        // WEB SCRAPERS
        String letterboxd_command;
        letterboxd_command = String.format("python -m scrapy runspider ./letterboxd/letterboxd/spiders/letterboxd_spider.py -a username=%s -s LOG_ENABLED=False", letterboxd_id);
        if (!Objects.equals(letterboxd_id, "-")) {
            ProcessBuilder processBuilder1 = new ProcessBuilder();
            processBuilder1.command("cmd.exe", "/c", letterboxd_command);

            System.out.println("start 1");
            Process process1 = processBuilder1.start();
            process1.waitFor();
            System.out.println("end 1");
        }

        String goodreads_command;
        goodreads_command = String.format("python -m scrapy runspider ./goodreads/goodreads/spiders/goodreads_spider.py -a username=%s -s LOG_ENABLED=False", goodreads_id);
        if (!Objects.equals(goodreads_id, "-")) {
            ProcessBuilder processBuilder2 = new ProcessBuilder();
            processBuilder2.command("cmd.exe", "/c", goodreads_command);

            System.out.println("start 2");
            Process process2 = processBuilder2.start();
            process2.waitFor();
            System.out.println("end 2");
        }


        // INPUT INTO DB
        String python_path = "C:\\Users\\guyda\\group_project\\1b_group_project\\create_person.py";
        String letterboxd_json = String.format("%s_film_data.json", letterboxd_id);
        String goodreads_json = String.format("%s_book_data.json", goodreads_id);
        String letterboxd_path = String.format("C:\\Users\\guyda\\group_project\\1b_group_project\\%s", letterboxd_json);
        String goodreads_path = String.format("C:\\Users\\guyda\\group_project\\1b_group_project\\%s", goodreads_json);
        String empty_path = "C:\\Users\\guyda\\group_project\\1b_group_project\\empty.json";
        String spotify_path = String.format("C:\\Users\\guyda\\group_project\\1b_group_project\\%s_song_data.json", spotify_id);

        if (Objects.equals(letterboxd_id, "-")) {
            letterboxd_path = empty_path;
        }
        if (Objects.equals(goodreads_id, "-")) {
            goodreads_path = empty_path;
        }
        if (Objects.equals(spotify_id, "-")) {
            spotify_path = empty_path;
        }

        ProcessBuilder processBuilder3 = new ProcessBuilder("python", python_path, letterboxd_path, spotify_path, goodreads_path);

        System.out.println("start 3");
        Process process3 = processBuilder3.start();
        process3.waitFor();
        System.out.println("end 3");

        if (!Objects.equals(letterboxd_id, "-")) {
            File l_file = new File(letterboxd_path);
            l_file.delete();
        }
        if (!Objects.equals(goodreads_id, "-")) {
            File g_file = new File(goodreads_path);
            g_file.delete();
        }
        if (!Objects.equals(spotify_id, "-")) {
            File s_file = new File(spotify_path);
            s_file.delete();
        }

        ArrayList<entity> res = new ArrayList<>();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
