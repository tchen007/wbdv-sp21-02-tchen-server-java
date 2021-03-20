package com.example.wbdvsp2102tchenserverjava.services;

import com.example.wbdvsp2102tchenserverjava.models.Widget;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {
    private List<Widget> widgets = new ArrayList<Widget>();
    {
        Widget w1 = new Widget(123l, "ABC123", "HEADING", 1, "Welcome to Widgets", "topic1");
        Widget w2 = new Widget(234l, "ABC234", "PARAGRAPH", 1, "This is a paragraph", "topic1");
        Widget w3 = new Widget(345l, "ABC234", "HEADING", 2, "Welcome to WebDev", "topic2");
        Widget w4 = new Widget(456l, "ABC234", "PARAGRAPH", 1, "Lorem ipsum", "topic2");
        widgets.add(w1);
        widgets.add(w2);
        widgets.add(w3);
        widgets.add(w4);
    }

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
        int widgetNum = 0;
        for(Widget w: widgets) {
            widgetNum++;
            if(w.getId().equals(widgetId)) {
                widgets.set(widgetNum, newWidget);
                return 1;
            }
        }
        return 0;
    }
    //        for(int i=0; i<widgets.size(); i++) {
//            Widget w = widgets.get(i);
//            if(w.getId().equals(id)) {
//                widgets.set(i, newWidget);
//                return 1;
//            }

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
