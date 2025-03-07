import Gdk from 'gi://Gdk?version=3.0';
import { openMenu } from "../utils.js";
import options from "options";

const { show_total } = options.bar.notifications;

const notifs = await Service.import("notifications");

export const Notifications = () => {
    return {
        component: Widget.Box({
            hpack: "start",
            child: Widget.Box({
                hpack: "start",
                class_name: "bar-notifications",
                children: Utils.merge(
                    [notifs.bind("notifications"), notifs.bind("dnd"), show_total.bind("value")],
                    (notif, dnd, showTotal) => {
                        const notifIcon = Widget.Label({
                            hpack: "center",
                            class_name: "bar-button-icon notifications txt-icon bar",
                            label: dnd ? "󰂛" : notif.length > 0 ? "󱅫" : "󰂚",
                        });

                        const notifLabel = Widget.Label({
                            hpack: "center",
                            class_name: "bar-button-label notifications",
                            label: notif.length.toString(),
                        });

                        if (showTotal) {
                            return [notifIcon, notifLabel];
                        }
                        return [notifIcon];
                    },
                ),
            }),
        }),
        isVisible: true,
        boxClass: "notifications",
        props: {
            on_primary_click: (clicked: any, event: Gdk.Event) => {
                openMenu(clicked, event, "notificationsmenu");
            },
        },
    };
};
