package com.producto.productocatalogo.repository;

import com.producto.productocatalogo.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuarioId(Long usuarioId);
    List<Pedido> findByEstado(Pedido.EstadoPedido estado);

    long countByEstado(Pedido.EstadoPedido estado);

    List<Pedido> findTop5ByOrderByFechaPedidoDesc();

    @Query("SELECT COALESCE(SUM(p.total), 0) FROM Pedido p")
    Double sumTotalIngresos();
} 