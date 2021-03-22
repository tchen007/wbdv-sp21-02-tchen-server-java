package com.example.wbdvsp2102tchenserverjava.services;

import com.example.wbdvsp2102tchenserverjava.models.Widget;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {
    private List<Widget> widgets = new ArrayList<Widget>();

    public Widget createWidget(Widget widget) {
        Long id = (new Date()).getTime();
        widget.setId(id);
        widgets.add(widget);
        return widget;
    }

//   Possible Future Bug - Returns the widgets list in WidgetService could change original since shallow copy
//    Need to override Widget.clone() and implement Cloneable Interface
    public List<Widget> findWidgetsForTopic(String topicId) {
        List<Widget> widgetsForTopic = new ArrayList<Widget>();
        for(Widget w: widgets) {
            if(w.getTopicId().equals(topicId)) {
                widgetsForTopic.add(w);
            }
        }
        return widgetsForTopic;
    }

    public int updateWidget(Long widgetId, Widget newWidget) {
        for(int i = 0; i < widgets.size(); i++) {
            Widget w = widgets.get(i);
            if(w.getId().equals(widgetId)) {
                widgets.set(i, newWidget);
                return 1;
            }
        }
        return 0;
    }

    public int deleteWidget(Long widgetId) {
        for(int i = 0; i < widgets.size(); i++) {
            Widget currentWidget = widgets.get(i);
            if (currentWidget.getId().equals(widgetId)) {
                widgets.remove(i);
                return 1;
            }
        }
        return 0;
    }

//    Potential future bug returning widgets which can be mutated
//    Should be returning deep copy of widgets instead
    public List<Widget> findAllWidgets() {
        return widgets;
    }

    public Widget findWidgetById(Long widgetId) {
        for(Widget w: widgets) {
            if(w.getId().equals(widgetId)){
                return w;
            }
        }
        return null;
    }

}
