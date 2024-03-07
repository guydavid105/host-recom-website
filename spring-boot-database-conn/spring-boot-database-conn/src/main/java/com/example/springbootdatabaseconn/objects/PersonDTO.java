package com.example.springbootdatabaseconn.objects;

import java.util.ArrayList;
import java.util.List;
import com.example.springbootdatabaseconn.models.entity;

public class PersonDTO {
    private Long user_id;
    private String spotify_id;
    private String goodreads_id;
    private String letterboxd_id;
    private List<entity> entities = new ArrayList<>();

    public PersonDTO(Long user_id, String spotify_id, String goodreads_id, String letterboxd_id) {
        this.user_id = user_id;
        this.spotify_id = spotify_id;
        this.goodreads_id = goodreads_id;
        this.letterboxd_id = letterboxd_id;
    }

    public Long getUser_id() { return this.user_id; }

    public String getSpotify_id() { return this.spotify_id; }

    public String getGoodreads_id() { return this.goodreads_id; }

    public String getLetterboxd_id() { return this.letterboxd_id; }

    public List<entity> getEntities() { return this.entities; }

    public void setEntities(List<entity> entities) {this.entities = entities; }
}
