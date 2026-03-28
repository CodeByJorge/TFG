package com.producto.productocatalogo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "tallas")
public class Talla {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre; // Por ejemplo: "S", "M", "L", "XL", "38", "40", etc.

    @JsonIgnore
    @ManyToMany(mappedBy = "tallas")
    private Set<Producto> productos = new HashSet<>();
} 