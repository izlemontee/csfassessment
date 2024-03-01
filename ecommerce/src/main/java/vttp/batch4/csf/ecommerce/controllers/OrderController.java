package vttp.batch4.csf.ecommerce.controllers;


import java.io.StringReader;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.json.JsonReader;
import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @ResponseBody
  @PostMapping(path = "/api/order")
  public ResponseEntity<String> postOrder(@RequestBody String requestBody) {
    // TODO Task 3
  Order order = convertStringToOrder(requestBody);
  JsonObjectBuilder JOB = Json.createObjectBuilder();
  try{
    poSvc.createNewPurchaseOrder(order);
    
    JOB.add("orderId",order.getOrderId());
    ResponseEntity<String> response = ResponseEntity.status(200).contentType(MediaType.APPLICATION_JSON)
                                    .body(JOB.build().toString());
    return response;
  }catch(RuntimeException ex){
    JOB.add("message",ex.getMessage());
    ResponseEntity<String> response = ResponseEntity.status(400).contentType(MediaType.APPLICATION_JSON)
                                        .body(JOB.build().toString());
    return response;
  }
	
  }

  public Order convertStringToOrder(String body){
    JsonReader reader = Json.createReader(new StringReader(body));
    JsonObject orderRaw = reader.readObject();
    String address = orderRaw.getString("address");
    String comments = orderRaw.getString("comments");
    String name = orderRaw.getString("name");
    boolean priority = orderRaw.getBoolean("priority");
    JsonObject cartJson = orderRaw.getJsonObject("cart");
    JsonArray lineItemsJson = cartJson.getJsonArray("lineItems");

    List<LineItem> lineItems = new LinkedList<>();
    for(int i=0; i<lineItemsJson.size(); i++){
      JsonObject item = lineItemsJson.getJsonObject(i);
      LineItem lineItem = new LineItem();
      lineItem.setName(item.getString("name"));
      lineItem.setPrice(Float.parseFloat(item.getJsonNumber("price").toString()));
      lineItem.setProductId(item.getString("prodId"));
      lineItem.setQuantity(item.getInt("quantity"));
      lineItems.add(lineItem);
    }

    Cart cart = new Cart();
    cart.setLineItems(lineItems);

    Order order = new Order();
    order.setAddress(address);
    order.setCart(cart);
    order.setComments(comments);
    order.setName(name);
    order.setPriority(priority);
    order.setDate(new Date());

    return order;

  }
}
