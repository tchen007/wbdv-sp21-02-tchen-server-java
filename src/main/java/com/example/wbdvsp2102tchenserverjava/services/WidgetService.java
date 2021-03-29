package com.example.wbdvsp2102tchenserverjava.services;

import com.example.wbdvsp2102tchenserverjava.models.Widget;
import com.example.wbdvsp2102tchenserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WidgetService {
    @Autowired
    WidgetRepository repository;

    public Widget createWidget(Widget widget) {
        return repository.save(widget);
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetsForTopic(topicId);
    }

    public int updateWidget(Long widgetId, Widget newWidget) {
        Widget originalWidget = repository.findById(widgetId).get();

        originalWidget.setName(newWidget.getName());
        originalWidget.setType(newWidget.getType());
        originalWidget.setWidgetOrder(newWidget.getWidgetOrder());
        originalWidget.setText(newWidget.getText());
        originalWidget.setUrl(newWidget.getUrl());
        originalWidget.setSize(newWidget.getSize());
        originalWidget.setWidth(newWidget.getWidth());
        originalWidget.setHeight(newWidget.getHeight());
        originalWidget.setCssClass(newWidget.getCssClass());
        originalWidget.setStyle(newWidget.getStyle());
        originalWidget.setValue(newWidget.getValue());
        originalWidget.setIsOrdered(newWidget.getIsOrdered());

        repository.save(originalWidget);
        return 1;
    }

    public int deleteWidget(Long widgetId) {
        repository.deleteById(widgetId);
        return 1;
    }

    public List<Widget> findAllWidgets() {
        return (List<Widget>) repository.findAll();
    }

    public Widget findWidgetById(Long widgetId) {
        return repository.findById(widgetId).get();
    }

}
