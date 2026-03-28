package com.producto.productocatalogo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopProductoDTO {
    private Long productoId;
    private String nombreProducto;
    private Long totalVendido;
}
