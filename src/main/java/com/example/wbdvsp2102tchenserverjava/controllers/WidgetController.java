package com.example.wbdvsp2102tchenserverjava.controllers;

import com.example.wbdvsp2102tchenserverjava.models.Widget;
import com.example.wbdvsp2102tchenserverjava.services.WidgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// RESTful endpoints
@RestController
public class WidgetController {
// Autowired will auto instantiate service and provide reference to the service variable
    @Autowired
    WidgetService service;

    @PostMapping("/api/topics/{tid}/widgets")
    public Widget createWidget(
            @PathVariable("tid") String topicId,
            @RequestBody Widget widget) {
        widget.setTopicId(topicId);
        return service.createWidget(widget);
    }

    @GetMapping("/api/widgets")
    public List<Widget> findAllWidgets() {
        return service.findAllWidgets();
    }

    @GetMapping("api/topics/{tid}/widgets")
    public List<Widget> findWidgetsForTopic(
            @PathVariable("tid") String topicId) {
        return service.findWidgetsForTopic(topicId);
    }

    @GetMapping("/api/widgets/{wid}")
    public Widget findWidgetById(
            @PathVariable("wid") Long id) {
        return service.findWidgetById(id);
    }

    @PutMapping("api/widgets/{wid}")
    public int updateWidget(
            @PathVariable("wid") Long widgetId,
            @RequestBody Widget widget) {
        return service.updateWidget(widgetId, widget);
    }

    @DeleteMapping("api/widgets/{wid}")
    public int deleteWidget(
            @PathVariable("wid") Long widgetId) {
        return service.deleteWidget(widgetId);
    }


}
