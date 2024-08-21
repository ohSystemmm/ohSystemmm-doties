const hyprland = await Service.import("hyprland");
import options from "options";

const { left, right } = options.menus.dashboard.shortcuts;

const Shortcuts = () => {
    const handleClick = (action: any, tOut: number = 250) => {
        App.closeWindow("dashboardmenu");

        setTimeout(() => {
            Utils.execAsync(action)
                .then((res) => {
                    return res;
                })
                .catch((err) => err);
        }, tOut);
    };

    const startOBS = () => {
        App.closeWindow("dashboardmenu");
        Utils.execAsync("obs").catch((err) => console.error(err));
    };

    return Widget.Box({
        class_name: "shortcuts-container",
        hpack: "fill",
        hexpand: true,
        children: [
            Widget.Box({
                class_name: "container most-used dashboard-card",
                hexpand: true,
                children: [
                    Widget.Box({
                        class_name: "card-button-left-section",
                        vertical: true,
                        hexpand: true,
                        children: [
                            Widget.Button({
                                tooltip_text: left.shortcut1.tooltip.bind("value"),
                                class_name: "dashboard-button top-button",
                                on_primary_click: left.shortcut1.command
                                    .bind("value")
                                    .as((cmd) => () => handleClick(cmd)),
                                child: Widget.Label({
                                    class_name: "button-label txt-icon",
                                    label: left.shortcut1.icon.bind("value"),
                                }),
                            }),
                            Widget.Button({
                                tooltip_text: left.shortcut2.tooltip.bind("value"),
                                class_name: "dashboard-button",
                                on_primary_click: left.shortcut2.command
                                    .bind("value")
                                    .as((cmd) => () => handleClick(cmd)),
                                child: Widget.Label({
                                    class_name: "button-label txt-icon",
                                    label: left.shortcut2.icon.bind("value"),
                                }),
                            }),
                        ],
                    }),
                    Widget.Box({
                        vertical: true,
                        hexpand: true,
                        children: [
                            Widget.Button({
                                tooltip_text: left.shortcut3.tooltip.bind("value"),
                                class_name: "dashboard-button top-button",
                                on_primary_click: left.shortcut3.command
                                    .bind("value")
                                    .as((cmd) => () => handleClick(cmd)),
                                child: Widget.Label({
                                    hpack: "center",
                                    class_name: "button-label txt-icon",
                                    label: left.shortcut3.icon.bind("value"),
                                }),
                            }),
                            Widget.Button({
                                tooltip_text: left.shortcut4.tooltip.bind("value"),
                                class_name: "dashboard-button",
                                on_primary_click: left.shortcut4.command
                                    .bind("value")
                                    .as((cmd) => () => handleClick(cmd)),
                                child: Widget.Label({
                                    class_name: "button-label txt-icon",
                                    label: left.shortcut4.icon.bind("value"),
                                }),
                            }),
                        ],
                    }),
                ],
            }),
            Widget.Box({
                class_name: "container utilities dashboard-card",
                hexpand: true,
                children: [
                    Widget.Box({
                        class_name: "card-button-left-section",
                        vertical: true,
                        hexpand: true,
                        children: [
                            Widget.Button({
                                tooltip_text: right.shortcut1.tooltip.bind("value"),
                                class_name: "dashboard-button top-button",
                                on_primary_click: right.shortcut1.command
                                    .bind("value")
                                    .as((cmd) => () => handleClick(cmd)),
                                child: Widget.Label({
                                    class_name: "button-label txt-icon",
                                    label: right.shortcut1.icon.bind("value"),
                                }),
                            }),
                            Widget.Button({
                                tooltip_text: "HyprPanel Configuration",
                                class_name: "dashboard-button",
                                on_primary_click: () => {
                                    App.closeWindow("dashboardmenu");
                                    App.toggleWindow("settings-dialog");
                                },
                                child: Widget.Label({
                                    class_name: "button-label txt-icon",
                                    label: "󰒓",
                                }),
                            }),
                        ],
                    }),
                    Widget.Box({
                        vertical: true,
                        hexpand: true,
                        children: [
                            Widget.Button({
                                tooltip_text: right.shortcut3.tooltip.bind("value"),
                                class_name: "dashboard-button top-button",
                                on_primary_click: right.shortcut3.command
                                    .bind("value")
                                    .as((cmd) => () => handleClick(cmd)),
                                child: Widget.Label({
                                    class_name: "button-label txt-icon",
                                    label: right.shortcut3.icon.bind("value"),
                                }),
                            }),
                            Widget.Button({
                                tooltip_text: "Start OBS",
                                class_name: "dashboard-button",
                                on_primary_click: startOBS,
                                child: Widget.Label({
                                    class_name: "button-label txt-icon",
                                    label: "󰑋", // Replace with appropriate icon for OBS
                                }),
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
};

export { Shortcuts };

