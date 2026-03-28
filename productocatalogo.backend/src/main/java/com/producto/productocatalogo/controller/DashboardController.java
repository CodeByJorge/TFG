package com.producto.productocatalogo.controller;

import com.producto.productocatalogo.dto.DashboardStatsDTO;
import com.producto.productocatalogo.dto.TopProductoDTO;
import com.producto.productocatalogo.dto.UltimoPedidoDTO;
import com.producto.productocatalogo.model.Pedido;
import com.producto.productocatalogo.repository.DetallePedidoRepository;
import com.producto.productocatalogo.repository.PedidoRepository;
import com.producto.productocatalogo.repository.ProductoRepository;
import com.producto.productocatalogo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getStats() {
        long totalProductos = productoRepository.count();
        long totalUsuarios = usuarioRepository.count();
        long totalPedidos = pedidoRepository.count();

        Double ingresosBrutos = pedidoRepository.sumTotalIngresos();
        double ingresosTotales = ingresosBrutos != null ? ingresosBrutos : 0.0;

        Map<String, Long> pedidosPorEstado = new LinkedHashMap<>();
        for (Pedido.EstadoPedido estado : Pedido.EstadoPedido.values()) {
            pedidosPorEstado.put(estado.name(), pedidoRepository.countByEstado(estado));
        }

        List<Pedido> lastPedidos = pedidoRepository.findTop5ByOrderByFechaPedidoDesc();
        List<UltimoPedidoDTO> ultimosPedidos = lastPedidos.stream()
                .map(p -> new UltimoPedidoDTO(
                        p.getId(),
                        p.getFechaPedido(),
                        p.getEstado().name(),
                        p.getTotal(),
                        p.getUsuario().getNombre()
                ))
                .collect(Collectors.toList());

        List<TopProductoDTO> topProductos = detallePedidoRepository
                .findTopProductosMasVendidos(PageRequest.of(0, 5));

        DashboardStatsDTO stats = DashboardStatsDTO.builder()
                .totalProductos(totalProductos)
                .totalUsuarios(totalUsuarios)
                .totalPedidos(totalPedidos)
                .ingresosTotales(ingresosTotales)
                .pedidosPorEstado(pedidosPorEstado)
                .ultimosPedidos(ultimosPedidos)
                .topProductos(topProductos)
                .build();

        return ResponseEntity.ok(stats);
    }
}
