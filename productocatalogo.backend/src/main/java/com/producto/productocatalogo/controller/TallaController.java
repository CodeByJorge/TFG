package com.producto.productocatalogo.controller;

import com.producto.productocatalogo.model.Talla;
import com.producto.productocatalogo.repository.TallaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tallas")
@CrossOrigin(origins = "*")
public class TallaController {

    @Autowired
    private TallaRepository tallaRepository;

    /**
     * Obtiene todas las tallas disponibles
     * GET /api/tallas
     */
    @GetMapping
    public List<Talla> getAllTallas() {
        return tallaRepository.findAll();
    }
}
