package com.example.amenity_project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "amenities")  // Tên bảng hiện tại trong cơ sở dữ liệu
public class Amenity {
    @Id
    @Column(name = "amenityId")  // Tên cột đã có sẵn trong bảng
    private Integer amenityId;

    @Column(name = "amenityName")
    private String amenityName;
    
    @Column(name = "description")
    private String description;

    @Column(name = "deflag")
    private Integer deflag = 1; // Đặt giá trị mặc định cho deflag

    // Constructor không tham số
    public Amenity() {
    }

    // Constructor với tham số
    public Amenity(Integer amenityId, String amenityName, String description, Integer deflag) {
        this.amenityId = amenityId;
        this.amenityName = amenityName;
        this.description = description;
        this.deflag = deflag;
    }

    // Getter và setter
    public Integer getAmenityId() {
        return amenityId;
    }

    public void setAmenityId(Integer amenityId) {
        this.amenityId = amenityId;
    }

    public String getAmenityName() {
        return amenityName;
    }

    public void setAmenityName(String amenityName) {
        this.amenityName = amenityName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDeflag() {
        return deflag;
    }

    public void setDeflag(Integer deflag) {
        this.deflag = deflag;
    }
}
