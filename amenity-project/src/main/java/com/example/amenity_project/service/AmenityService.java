package com.example.amenity_project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.amenity_project.model.Amenity;
import com.example.amenity_project.repository.AmenityRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AmenityService {

    @Autowired
    private AmenityRepository amenityRepository;

    public List<Amenity> getAllAmenities() {
        return amenityRepository.findAll();
    }

    public Optional<Amenity> getAmenityById(Integer id) {
        return amenityRepository.findById(id);
    }

    public Amenity createAmenity(Amenity amenity) {
        // Mặc định deflag = 1 nếu không được chỉ định
        if (amenity.getDeflag() == null) {
            amenity.setDeflag(1);
        }
        try {
            return amenityRepository.save(amenity);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi tạo tiện ích: " + e.getMessage());
        }
    }

    public Amenity updateAmenity(Integer id, Amenity amenityDetails) {
        Amenity amenity = amenityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tiện ích không tìm thấy"));

        amenity.setAmenityName(amenityDetails.getAmenityName());
        amenity.setDescription(amenityDetails.getDescription());
        amenity.setDeflag(amenityDetails.getDeflag());

        return amenityRepository.save(amenity);
    }
    public void deleteAmenity(Integer id) {
        amenityRepository.deleteById(id);
    }
}

