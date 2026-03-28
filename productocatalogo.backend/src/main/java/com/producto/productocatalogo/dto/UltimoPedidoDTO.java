package com.producto.productocatalogo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UltimoPedidoDTO {
    private Long id;
    private LocalDateTime fechaPedido;
    private String estado;
    private Double total;
    private String nombreUsuario;
}
