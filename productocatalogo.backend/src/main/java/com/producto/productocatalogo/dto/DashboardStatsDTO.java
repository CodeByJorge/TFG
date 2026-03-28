package com.producto.productocatalogo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStatsDTO {
    private long totalProductos;
    private long totalUsuarios;
    private long totalPedidos;
    private double ingresosTotales;
    private Map<String, Long> pedidosPorEstado;
    private List<UltimoPedidoDTO> ultimosPedidos;
    private List<TopProductoDTO> topProductos;
}
