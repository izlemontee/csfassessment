package vttp.batch4.csf.ecommerce.repositories;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public void create(Order order) {
    // TODO Task 3
    String orderId = order.getOrderId();
    String address = order.getAddress();
    Cart cart = order.getCart();
    String comments = order.getComments();
    Date date = order.getDate();
    String name = order.getName();
    boolean priority = order.getPriority();

    // insert order
    template.update(SQL_INSERT_ORDER,
      orderId,date,name,address,priority,comments
    );

    // insert items
    for(LineItem l: cart.getLineItems()){
      String lineItemName = l.getName();
      Float price = l.getPrice();
      String productId = l.getProductId();
      int quantity = l.getQuantity();
      template.update(SQL_INSERT_LINEITEM,
        productId, lineItemName, quantity, price, orderId
      );
    }
  }

  private String SQL_INSERT_ORDER ="""
      INSERT INTO orders (orderId, date, name, address, priority, comments)
      VALUES(?, ?, ?, ?, ?, ?)
      """;

  private String SQL_INSERT_LINEITEM="""
      INSERT INTO line_item (productId, name, quantity, price, orderId)
      VALUES(?, ?, ?, ?, ?)
      """;
}
