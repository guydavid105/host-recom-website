package com.example.springbootdatabaseconn.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Relationship;

import javax.swing.text.html.parser.Entity;
import java.util.ArrayList;
import java.util.List;

@Node 
public class person {
    @Id @GeneratedValue
    private Long user_id2;
    private Long user_id;
    private String spotify_id;
    private String goodreads_id;
    private String letterboxd_id;
    @Relationship(type = "likes", direction = Relationship.Direction.OUTGOING)
    private List<entity> entities = new ArrayList<>();


    public person(){}

    public Long getUser_id() { return this.user_id; }

    public void setUser_id(Long user_id) { this.user_id = user_id; }

    public String getSpotify_id() { return this.spotify_id; }

    public void setSpotify_id_id(String spotify_id) {
        this.spotify_id = spotify_id;
    }

    public String getGoodreads_id() {
        return this.goodreads_id;
    }

    public void setGoodreads_id(String goodreads_id) {
        this.goodreads_id = goodreads_id;
    }

    public String getLetterboxd_id() {
        return this.letterboxd_id;
    }

    public void setLetterboxd_id(String letterboxd_id){
        this.letterboxd_id = letterboxd_id;
    }

    public List<entity> getEntities() { return entities; }

    public void setEntities(List<entity> entities) { this.entities = entities; }
}
