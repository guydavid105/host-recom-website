package com.example.springbootdatabaseconn.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
public class entity {
    @Id @GeneratedValue
    private Long id2;
    private String id;
    private String type;
    private String title;
    private String img;

    private String date;

    public entity() {}

    public String getId() { return this.id; }

    public void setId(String id) { this.id = id; }

    public String getType() { return this.type; }

    public void getType(String type) { this.type = type; }

    public String getTitle() {return this.title; }

    public void setTitle(String title) { this.title = title; }

    public String getImg() { return this.img; }

    public void setImg(String img) { this.img = img; }

    public String getDate() { return this.date; }

    public void setDate(String date) { this.date = date; }
}
