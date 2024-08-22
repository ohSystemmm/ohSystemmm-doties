// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/lib/session.ts
import GLib from "gi://GLib?version=2.0";
Object.assign(globalThis, {
  OPTIONS: `${GLib.get_user_cache_dir()}/ags/hyprpanel/options.json`,
  TMP: `${GLib.get_tmp_dir()}/ags/hyprpanel`,
  USER: GLib.get_user_name()
});
Utils.ensureDirectory(TMP);
App.addIcons(`${App.configDir}/assets`);

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/lib/option.ts
import {Variable as Variable2} from "resource:///com/github/Aylur/ags/variable.js";
function getOptions(object, path = "") {
  return Object.keys(object).flatMap((key) => {
    const obj = object[key];
    const id = path ? path + "." + key : key;
    if (obj instanceof Variable2) {
      obj.id = id;
      return obj;
    }
    if (typeof obj === "object")
      return getOptions(obj, id);
    return [];
  });
}
function mkOptions(cacheFile, object, confFile = "config.json") {
  for (const opt of getOptions(object))
    opt.init(cacheFile);
  Utils.ensureDirectory(cacheFile.split("/").slice(0, -1).join("/"));
  const configFile = `${TMP}/${confFile}`;
  const values = getOptions(object).reduce((obj, { id, value }) => ({ [id]: value, ...obj }), {});
  Utils.writeFileSync(JSON.stringify(values, null, 2), configFile);
  Utils.monitorFile(configFile, () => {
    const cache = JSON.parse(Utils.readFile(configFile) || "{}");
    for (const opt of getOptions(object)) {
      if (JSON.stringify(cache[opt.id]) !== JSON.stringify(opt.value))
        opt.value = cache[opt.id];
    }
  });
  function sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }
  async function reset([opt, ...list] = getOptions(object), id = opt?.reset()) {
    if (!opt)
      return sleep().then(() => []);
    return id ? [id, ...await sleep(50).then(() => reset(list))] : await sleep().then(() => reset(list));
  }
  async function resetTheme([opt, ...list] = getOptions(object), id = opt?.doResetColor()) {
    if (!opt)
      return sleep().then(() => []);
    return id ? [id, ...await sleep(50).then(() => resetTheme(list))] : await sleep().then(() => resetTheme(list));
  }
  return Object.assign(object, {
    configFile,
    array: () => getOptions(object),
    async reset() {
      return (await reset()).join("\n");
    },
    async resetTheme() {
      return (await resetTheme()).join("\n");
    },
    handler(deps, callback) {
      for (const opt of getOptions(object)) {
        if (deps.some((i) => opt.id.startsWith(i)))
          opt.connect("changed", callback);
      }
    }
  });
}

class Opt extends Variable2 {
  static {
    Service.register(this);
  }
  constructor(initial, { persistent = false } = {}) {
    super(initial);
    this.initial = initial;
    this.persistent = persistent;
  }
  initial;
  id = "";
  persistent;
  toString() {
    return `${this.value}`;
  }
  toJSON() {
    return `opt:${this.value}`;
  }
  getValue = () => {
    return super.getValue();
  };
  init(cacheFile) {
    const cacheV = JSON.parse(Utils.readFile(cacheFile) || "{}")[this.id];
    if (cacheV !== undefined)
      this.value = cacheV;
    this.connect("changed", () => {
      const cache = JSON.parse(Utils.readFile(cacheFile) || "{}");
      cache[this.id] = this.value;
      Utils.writeFileSync(JSON.stringify(cache, null, 2), cacheFile);
    });
  }
  reset() {
    if (this.persistent)
      return;
    if (JSON.stringify(this.value) !== JSON.stringify(this.initial)) {
      this.value = this.initial;
      return this.id;
    }
  }
  doResetColor() {
    if (this.persistent)
      return;
    const isColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(`${this.value}`);
    if (JSON.stringify(this.value) !== JSON.stringify(this.initial) && isColor) {
      this.value = this.initial;
      return this.id;
    }
    return;
  }
}
var opt = (initial, opts) => new Opt(initial, opts);

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/options.ts
var colors = {
  rosewater: "#f5e0dc",
  flamingo: "#f2cdcd",
  pink: "#f5c2e7",
  mauve: "#cba6f7",
  red: "#f38ba8",
  maroon: "#eba0ac",
  peach: "#fab387",
  yellow: "#f9e2af",
  green: "#a6e3a1",
  teal: "#94e2d5",
  sky: "#89dceb",
  sapphire: "#74c7ec",
  blue: "#89b4fa",
  lavender: "#b4befe",
  text: "#cdd6f4",
  subtext1: "#bac2de",
  subtext2: "#a6adc8",
  overlay2: "#9399b2",
  overlay1: "#7f849c",
  overlay0: "#6c7086",
  surface2: "#585b70",
  surface1: "#45475a",
  surface0: "#313244",
  base2: "#242438",
  base: "#1e1e2e",
  mantle: "#181825",
  crust: "#11111b"
};
var secondary_colors = {
  text: "#cdd6f3",
  pink: "#f5c2e6",
  red: "#f38ba7",
  mantle: "#181824",
  surface1: "#454759",
  surface0: "#313243",
  overlay1: "#7f849b",
  lavender: "#b4befd",
  mauve: "#cba6f6",
  green: "#a6e3a0",
  sky: "#89dcea",
  teal: "#94e2d4",
  yellow: "#f9e2ad",
  maroon: "#eba0ab",
  crust: "#11111a",
  surface2: "#585b69"
};
var tertiary_colors = {
  pink: "#f5c2e8",
  red: "#f38ba9",
  mantle: "#181826",
  surface0: "#313245",
  overlay1: "#7f849d",
  lavender: "#b4beff",
  mauve: "#cba6f8",
  green: "#a6e3a2",
  sky: "#89dcec",
  teal: "#94e2d6",
  yellow: "#f9e2ae",
  maroon: "#eba0ad",
  crust: "#11111c",
  surface2: "#585b71"
};
var options = mkOptions(OPTIONS, {
  theme: {
    matugen: opt(false),
    matugen_settings: {
      mode: opt("dark"),
      scheme_type: opt("tonal-spot"),
      variation: opt("standard_1"),
      contrast: opt(0)
    },
    font: {
      size: opt("1.2rem"),
      name: opt("Ubuntu Nerd Font"),
      weight: opt(600)
    },
    notification: {
      scaling: opt(100),
      background: opt(tertiary_colors.mantle),
      opacity: opt(100),
      actions: {
        background: opt(secondary_colors.lavender),
        text: opt(colors.mantle)
      },
      label: opt(colors.lavender),
      border: opt(secondary_colors.surface0),
      time: opt(secondary_colors.overlay1),
      text: opt(colors.text),
      labelicon: opt(colors.lavender),
      close_button: {
        background: opt(secondary_colors.red),
        label: opt(colors.crust)
      }
    },
    osd: {
      scaling: opt(100),
      enable: opt(true),
      orientation: opt("vertical"),
      opacity: opt(100),
      bar_container: opt(colors.crust),
      icon_container: opt(tertiary_colors.lavender),
      bar_color: opt(tertiary_colors.lavender),
      bar_empty_color: opt(colors.surface0),
      bar_overflow_color: opt(secondary_colors.red),
      icon: opt(colors.crust),
      label: opt(tertiary_colors.lavender),
      monitor: opt(0),
      active_monitor: opt(true),
      radius: opt("0.4em"),
      margins: opt("0px 5px 0px 0px"),
      location: opt("right"),
      muted_zero: opt(false)
    },
    bar: {
      scaling: opt(100),
      floating: opt(false),
      layer: opt("top"),
      margin_top: opt("0.5em"),
      opacity: opt(100),
      margin_bottom: opt("0em"),
      margin_sides: opt("0.5em"),
      border_radius: opt("0.4em"),
      outer_spacing: opt("1.6em"),
      label_spacing: opt("0.5em"),
      transparent: opt(false),
      background: opt(colors.crust),
      buttons: {
        monochrome: opt(false),
        spacing: opt("0.25em"),
        y_margins: opt("0.4em"),
        radius: opt("0.3em"),
        opacity: opt(100),
        background: opt(colors.base2),
        hover: opt(colors.surface1),
        text: opt(colors.lavender),
        icon: opt(colors.lavender),
        dashboard: {
          background: opt(colors.base2),
          hover: opt(colors.surface1),
          icon: opt(colors.yellow)
        },
        workspaces: {
          background: opt(colors.base2),
          hover: opt(colors.surface1),
          available: opt(colors.sky),
          occupied: opt(colors.flamingo),
          active: opt(colors.pink),
          numbered_active_highlight_border: opt("0.2em"),
          numbered_active_highlight_padding: opt("0.2em"),
          numbered_active_highlighted_text_color: opt(colors.mantle),
          numbered_active_underline_color: opt(colors.pink)
        },
        windowtitle: {
          background: opt(colors.base2),
          hover: opt(colors.surface1),
          text: opt(colors.pink),
          icon: opt(colors.pink),
          spacing: opt("0.5em")
        },
        media: {
          background: opt(colors.base2),
          hover: opt(colors.surface1),
          text: opt(colors.lavender),
          icon: opt(colors.lavender),
          spacing: opt("0.5em")
        },
        volume: {
          background: opt(colors.base2),
          hover: opt(colors.surface1),
          text: opt(colors.maroon),
          icon: opt(colors.maroon),
          spacing: opt("0.5em")
        },
        network: {
          background: opt(colors.base2),
          hover: opt(colors.surface1),
          text: opt(colors.mauve),
          icon: opt(colors.mauve),
          spacing: opt("0.5em")
        },
        bluetooth: {
          background: opt(colors.base2),
          hover: opt(colors.surface1),
          text: opt(colors.sky),
          icon: opt(colors.sky),
          spacing: opt("0.5em")
        },
        systray: {
          background: opt(colors.base2),
          hover: opt(colors.surface1)
        },
        battery: {
          background: opt(colors.base2),
          hover: opt(colors.surface1),
          text: opt(colors.yellow),
          icon: opt(colors.yellow),
          spacing: opt("0.5em")
        },
        clock: {
          background: opt(colors.base2),
          hover: opt(colors.surface1),
          text: opt(colors.pink),
          icon: opt(colors.pink)
        },
        notifications: {
          background: opt(colors.base2),
          hover: opt(colors.surface1),
          icon: opt(colors.lavender),
          total: opt(colors.lavender),
          spacing: opt("0.5em")
        }
      },
      menus: {
        monochrome: opt(false),
        background: opt(colors.crust),
        opacity: opt(100),
        cards: opt(colors.base),
        card_radius: opt("0.4em"),
        border: {
          size: opt("0.13em"),
          radius: opt("0.7em"),
          color: opt(colors.surface0)
        },
        text: opt(colors.text),
        dimtext: opt(colors.surface2),
        feinttext: opt(colors.surface0),
        label: opt(colors.lavender),
        popover: {
          text: opt(colors.lavender),
          background: opt(secondary_colors.mantle),
          border: opt(secondary_colors.mantle)
        },
        listitems: {
          passive: opt(colors.text),
          active: opt(secondary_colors.lavender)
        },
        icons: {
          passive: opt(colors.surface2),
          active: opt(colors.lavender)
        },
        switch: {
          enabled: opt(colors.lavender),
          disabled: opt(tertiary_colors.surface0),
          puck: opt(secondary_colors.surface1)
        },
        check_radio_button: {
          background: opt(colors.surface1),
          active: opt(tertiary_colors.lavender)
        },
        buttons: {
          default: opt(colors.lavender),
          active: opt(secondary_colors.pink),
          disabled: opt(tertiary_colors.surface2),
          text: opt(secondary_colors.mantle)
        },
        iconbuttons: {
          passive: opt(secondary_colors.text),
          active: opt(tertiary_colors.lavender)
        },
        progressbar: {
          foreground: opt(colors.lavender),
          background: opt(colors.surface1)
        },
        slider: {
          primary: opt(colors.lavender),
          background: opt(tertiary_colors.surface2),
          backgroundhover: opt(colors.surface1),
          puck: opt(colors.overlay0)
        },
        dropdownmenu: {
          background: opt(colors.crust),
          text: opt(colors.text),
          divider: opt(colors.base)
        },
        tooltip: {
          background: opt(colors.crust),
          text: opt(tertiary_colors.lavender)
        },
        menu: {
          media: {
            scaling: opt(100),
            song: opt(tertiary_colors.lavender),
            artist: opt(tertiary_colors.teal),
            album: opt(tertiary_colors.pink),
            background: {
              color: opt(colors.crust)
            },
            card: {
              color: opt(colors.base),
              tint: opt(85)
            },
            border: {
              color: opt(colors.surface0)
            },
            buttons: {
              inactive: opt(colors.surface2),
              enabled: opt(secondary_colors.teal),
              background: opt(tertiary_colors.lavender),
              text: opt(colors.crust)
            },
            slider: {
              primary: opt(colors.pink),
              background: opt(tertiary_colors.surface2),
              backgroundhover: opt(colors.surface1),
              puck: opt(colors.overlay0)
            }
          },
          volume: {
            scaling: opt(100),
            card: {
              color: opt(colors.base)
            },
            background: {
              color: opt(colors.crust)
            },
            border: {
              color: opt(colors.surface0)
            },
            label: {
              color: opt(colors.maroon)
            },
            text: opt(colors.text),
            listitems: {
              passive: opt(colors.text),
              active: opt(secondary_colors.maroon)
            },
            iconbutton: {
              passive: opt(colors.text),
              active: opt(colors.maroon)
            },
            icons: {
              passive: opt(colors.overlay2),
              active: opt(colors.maroon)
            },
            audio_slider: {
              primary: opt(colors.maroon),
              background: opt(tertiary_colors.surface2),
              backgroundhover: opt(colors.surface1),
              puck: opt(colors.surface2)
            },
            input_slider: {
              primary: opt(colors.maroon),
              background: opt(tertiary_colors.surface2),
              backgroundhover: opt(colors.surface1),
              puck: opt(colors.surface2)
            }
          },
          network: {
            scaling: opt(100),
            card: {
              color: opt(colors.base)
            },
            background: {
              color: opt(colors.crust)
            },
            border: {
              color: opt(colors.surface0)
            },
            label: {
              color: opt(colors.mauve)
            },
            text: opt(colors.text),
            status: {
              color: opt(colors.overlay0)
            },
            listitems: {
              passive: opt(colors.text),
              active: opt(secondary_colors.mauve)
            },
            icons: {
              passive: opt(colors.overlay2),
              active: opt(colors.mauve)
            },
            iconbuttons: {
              passive: opt(colors.text),
              active: opt(colors.mauve)
            }
          },
          bluetooth: {
            scaling: opt(100),
            card: {
              color: opt(colors.base)
            },
            background: {
              color: opt(colors.crust)
            },
            border: {
              color: opt(colors.surface0)
            },
            label: {
              color: opt(colors.sky)
            },
            text: opt(colors.text),
            status: opt(colors.overlay0),
            switch_divider: opt(colors.surface1),
            switch: {
              enabled: opt(colors.sky),
              disabled: opt(tertiary_colors.surface0),
              puck: opt(secondary_colors.surface1)
            },
            listitems: {
              passive: opt(colors.text),
              active: opt(secondary_colors.sky)
            },
            icons: {
              passive: opt(colors.overlay2),
              active: opt(colors.sky)
            },
            iconbutton: {
              passive: opt(colors.text),
              active: opt(colors.sky)
            }
          },
          systray: {
            dropdownmenu: {
              background: opt(colors.crust),
              text: opt(colors.text),
              divider: opt(colors.base)
            }
          },
          battery: {
            scaling: opt(100),
            card: {
              color: opt(colors.base)
            },
            background: {
              color: opt(colors.crust)
            },
            border: {
              color: opt(colors.surface0)
            },
            label: {
              color: opt(colors.yellow)
            },
            text: opt(colors.text),
            listitems: {
              passive: opt(secondary_colors.text),
              active: opt(colors.yellow)
            },
            icons: {
              passive: opt(colors.overlay2),
              active: opt(colors.yellow)
            },
            slider: {
              primary: opt(colors.yellow),
              background: opt(tertiary_colors.surface2),
              backgroundhover: opt(colors.surface1),
              puck: opt(colors.overlay0)
            }
          },
          clock: {
            scaling: opt(100),
            card: {
              color: opt(colors.base)
            },
            background: {
              color: opt(colors.crust)
            },
            border: {
              color: opt(colors.surface0)
            },
            text: opt(colors.text),
            time: {
              time: opt(colors.pink),
              timeperiod: opt(colors.teal)
            },
            calendar: {
              yearmonth: opt(colors.teal),
              weekdays: opt(colors.pink),
              paginator: opt(secondary_colors.pink),
              currentday: opt(colors.pink),
              days: opt(colors.text),
              contextdays: opt(colors.surface2)
            },
            weather: {
              icon: opt(colors.pink),
              temperature: opt(colors.text),
              status: opt(colors.teal),
              stats: opt(colors.pink),
              thermometer: {
                extremelyhot: opt(colors.red),
                hot: opt(colors.peach),
                moderate: opt(colors.lavender),
                cold: opt(colors.blue),
                extremelycold: opt(colors.sky)
              },
              hourly: {
                time: opt(colors.pink),
                icon: opt(colors.pink),
                temperature: opt(colors.pink)
              }
            }
          },
          dashboard: {
            scaling: opt(100),
            confirmation_scaling: opt(100),
            card: {
              color: opt(colors.base)
            },
            background: {
              color: opt(colors.crust)
            },
            border: {
              color: opt(colors.surface0)
            },
            profile: {
              name: opt(colors.pink)
            },
            powermenu: {
              shutdown: opt(colors.red),
              restart: opt(colors.peach),
              logout: opt(colors.green),
              sleep: opt(colors.sky),
              confirmation: {
                card: opt(colors.base),
                background: opt(colors.crust),
                border: opt(colors.surface0),
                label: opt(colors.lavender),
                body: opt(colors.text),
                confirm: opt(colors.green),
                deny: opt(colors.red),
                button_text: opt(secondary_colors.crust)
              }
            },
            shortcuts: {
              background: opt(colors.lavender),
              text: opt(secondary_colors.mantle),
              recording: opt(colors.green)
            },
            controls: {
              disabled: opt(colors.surface2),
              wifi: {
                background: opt(colors.mauve),
                text: opt(secondary_colors.mantle)
              },
              bluetooth: {
                background: opt(colors.sky),
                text: opt(secondary_colors.mantle)
              },
              notifications: {
                background: opt(colors.yellow),
                text: opt(secondary_colors.mantle)
              },
              volume: {
                background: opt(colors.maroon),
                text: opt(secondary_colors.mantle)
              },
              input: {
                background: opt(colors.pink),
                text: opt(secondary_colors.mantle)
              }
            },
            directories: {
              left: {
                top: {
                  color: opt(colors.pink)
                },
                middle: {
                  color: opt(colors.yellow)
                },
                bottom: {
                  color: opt(colors.maroon)
                }
              },
              right: {
                top: {
                  color: opt(colors.teal)
                },
                middle: {
                  color: opt(colors.mauve)
                },
                bottom: {
                  color: opt(colors.lavender)
                }
              }
            },
            monitors: {
              bar_background: opt(colors.surface1),
              cpu: {
                icon: opt(colors.maroon),
                bar: opt(tertiary_colors.maroon),
                label: opt(colors.maroon)
              },
              ram: {
                icon: opt(colors.yellow),
                bar: opt(tertiary_colors.yellow),
                label: opt(colors.yellow)
              },
              gpu: {
                icon: opt(colors.green),
                bar: opt(tertiary_colors.green),
                label: opt(colors.green)
              },
              disk: {
                icon: opt(colors.pink),
                bar: opt(tertiary_colors.pink),
                label: opt(colors.pink)
              }
            }
          },
          notifications: {
            scaling: opt(100),
            label: opt(colors.lavender),
            no_notifications_label: opt(colors.surface0),
            background: opt(colors.crust),
            card: opt(colors.base),
            border: opt(colors.surface0),
            switch_divider: opt(colors.surface1),
            clear: opt(colors.red),
            switch: {
              enabled: opt(colors.lavender),
              disabled: opt(tertiary_colors.surface0),
              puck: opt(secondary_colors.surface1)
            }
          }
        }
      }
    }
  },
  bar: {
    layouts: opt({
      "1": {
        left: [
          "dashboard",
          "workspaces",
          "windowtitle"
        ],
        middle: [
          "media"
        ],
        right: [
          "volume",
          "clock",
          "notifications"
        ]
      },
      "2": {
        left: [
          "dashboard",
          "workspaces",
          "windowtitle"
        ],
        middle: [
          "media"
        ],
        right: [
          "volume",
          "clock",
          "notifications"
        ]
      },
      "0": {
        left: [
          "dashboard",
          "workspaces",
          "windowtitle"
        ],
        middle: [
          "media"
        ],
        right: [
          "volume",
          "network",
          "bluetooth",
          "battery",
          "systray",
          "clock",
          "notifications"
        ]
      }
    }),
    launcher: {
      icon: opt("\uDB82\uDCC7")
    },
    windowtitle: {
      title_map: opt([])
    },
    workspaces: {
      show_icons: opt(false),
      show_numbered: opt(false),
      numbered_active_indicator: opt("underline"),
      icons: {
        available: opt("\uF10C"),
        active: opt("\uF111"),
        occupied: opt("\uF192")
      },
      workspaces: opt(10),
      spacing: opt(1),
      monitorSpecific: opt(true),
      workspaceMask: opt(false),
      reverse_scroll: opt(false),
      scroll_speed: opt(5)
    },
    volume: {
      label: opt(true)
    },
    network: {
      truncation: opt(true),
      truncation_size: opt(7),
      label: opt(true)
    },
    bluetooth: {
      label: opt(true)
    },
    battery: {
      label: opt(true)
    },
    systray: {
      ignore: opt([
        "KDE Connect Indicator",
        "spotify-client"
      ])
    },
    clock: {
      format: opt("\uDB80\uDCED  %a %b %d  \uF017  %I:%M:%S %p")
    },
    media: {
      show_artist: opt(false),
      truncation: opt(true),
      show_label: opt(true),
      truncation_size: opt(30)
    },
    notifications: {
      show_total: opt(false)
    }
  },
  menus: {
    dashboard: {
      powermenu: {
        confirmation: opt(true),
        sleep: opt("systemctl suspend"),
        reboot: opt("systemctl reboot"),
        logout: opt("pkill Hyprland"),
        shutdown: opt("shutdown now"),
        avatar: {
          image: opt("avatar-default-symbolic"),
          name: opt("system")
        }
      },
      stats: {
        enable_gpu: opt(false)
      },
      shortcuts: {
        left: {
          shortcut1: {
            icon: opt("\uDB80\uDDE9"),
            tooltip: opt("Microsoft Edge"),
            command: opt("microsoft-edge-stable")
          },
          shortcut2: {
            icon: opt("\uF1BC"),
            tooltip: opt("Spotify"),
            command: opt("spotify-launcher")
          },
          shortcut3: {
            icon: opt("\uF1FF"),
            tooltip: opt("Discord"),
            command: opt("discord")
          },
          shortcut4: {
            icon: opt("\uE68F"),
            tooltip: opt("Search Apps"),
            command: opt("rofi -show drun")
          }
        },
        right: {
          shortcut1: {
            icon: opt("\uF1FB"),
            tooltip: opt("Color Picker"),
            command: opt("hyprpicker -a")
          },
          shortcut3: {
            icon: opt("\uDB80\uDD00"),
            tooltip: opt("Screenshot"),
            command: opt("bash -c \"$HOME/.config/ags/services/snapshot.sh\"")
          }
        }
      },
      directories: {
        left: {
          directory1: {
            label: opt("\uDB80\uDE4D Downloads"),
            command: opt("bash -c \"dolphin $HOME/Downloads/\"")
          },
          directory2: {
            label: opt("\uDB80\uDE4F Videos"),
            command: opt("bash -c \"dolphin $HOME/Videos/\"")
          },
          directory3: {
            label: opt("\uDB81\uDE9D Projects"),
            command: opt("bash -c \"dolphin $HOME/Projects/\"")
          }
        },
        right: {
          directory1: {
            label: opt("\uDB86\uDDF6 Documents"),
            command: opt("bash -c \"dolphin $HOME/Documents/\"")
          },
          directory2: {
            label: opt("\uDB80\uDE4F Pictures"),
            command: opt("bash -c \"dolphin $HOME/Pictures/\"")
          },
          directory3: {
            label: opt("\uDB84\uDCB5 Home"),
            command: opt("bash -c \"dolphin $HOME/\"")
          }
        }
      }
    },
    clock: {
      time: {
        military: opt(false)
      },
      weather: {
        interval: opt(60000),
        unit: opt("imperial"),
        location: opt("Los Angeles"),
        key: opt(JSON.parse(Utils.readFile(`${App.configDir}/.weather.json`) || "{}")?.weather_api_key || "")
      }
    }
  },
  terminal: opt("kitty"),
  wallpaper: {
    enable: opt(true),
    image: opt("")
  },
  notifications: {
    position: opt("top right"),
    monitor: opt(0),
    active_monitor: opt(true),
    timeout: opt(7000),
    cache_actions: opt(true)
  },
  dummy: opt(true)
});
globalThis["options"] = options;
var options_default = options;

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/lib/icons.ts
var icons_default = {
  missing: "image-missing-symbolic",
  nix: {
    nix: "nix-snowflake-symbolic"
  },
  app: {
    terminal: "terminal-symbolic"
  },
  fallback: {
    executable: "application-x-executable",
    notification: "dialog-information-symbolic",
    video: "video-x-generic-symbolic",
    audio: "audio-x-generic-symbolic"
  },
  ui: {
    close: "window-close-symbolic",
    colorpicker: "color-select-symbolic",
    info: "info-symbolic",
    link: "external-link-symbolic",
    lock: "system-lock-screen-symbolic",
    menu: "open-menu-symbolic",
    refresh: "view-refresh-symbolic",
    search: "system-search-symbolic",
    settings: "emblem-system-symbolic",
    themes: "preferences-desktop-theme-symbolic",
    tick: "object-select-symbolic",
    time: "hourglass-symbolic",
    toolbars: "toolbars-symbolic",
    warning: "dialog-warning-symbolic",
    avatar: "avatar-default-symbolic",
    arrow: {
      right: "pan-end-symbolic",
      left: "pan-start-symbolic",
      down: "pan-down-symbolic",
      up: "pan-up-symbolic"
    }
  },
  audio: {
    mic: {
      muted: "microphone-disabled-symbolic",
      low: "microphone-sensitivity-low-symbolic",
      medium: "microphone-sensitivity-medium-symbolic",
      high: "microphone-sensitivity-high-symbolic"
    },
    volume: {
      muted: "audio-volume-muted-symbolic",
      low: "audio-volume-low-symbolic",
      medium: "audio-volume-medium-symbolic",
      high: "audio-volume-high-symbolic",
      overamplified: "audio-volume-overamplified-symbolic"
    },
    type: {
      headset: "audio-headphones-symbolic",
      speaker: "audio-speakers-symbolic",
      card: "audio-card-symbolic"
    },
    mixer: "mixer-symbolic"
  },
  powerprofile: {
    balanced: "power-profile-balanced-symbolic",
    "power-saver": "power-profile-power-saver-symbolic",
    performance: "power-profile-performance-symbolic"
  },
  asusctl: {
    profile: {
      Balanced: "power-profile-balanced-symbolic",
      Quiet: "power-profile-power-saver-symbolic",
      Performance: "power-profile-performance-symbolic"
    },
    mode: {
      Integrated: "processor-symbolic",
      Hybrid: "controller-symbolic"
    }
  },
  battery: {
    charging: "battery-flash-symbolic",
    warning: "battery-empty-symbolic"
  },
  bluetooth: {
    enabled: "bluetooth-active-symbolic",
    disabled: "bluetooth-disabled-symbolic"
  },
  brightness: {
    indicator: "display-brightness-symbolic",
    keyboard: "keyboard-brightness-symbolic",
    screen: "display-brightness-symbolic"
  },
  powermenu: {
    sleep: "weather-clear-night-symbolic",
    reboot: "system-reboot-symbolic",
    logout: "system-log-out-symbolic",
    shutdown: "system-shutdown-symbolic"
  },
  recorder: {
    recording: "media-record-symbolic"
  },
  notifications: {
    noisy: "org.gnome.Settings-notifications-symbolic",
    silent: "notifications-disabled-symbolic",
    message: "chat-bubbles-symbolic"
  },
  trash: {
    full: "user-trash-full-symbolic",
    empty: "user-trash-symbolic"
  },
  mpris: {
    shuffle: {
      enabled: "media-playlist-shuffle-symbolic",
      disabled: "media-playlist-consecutive-symbolic"
    },
    loop: {
      none: "media-playlist-repeat-symbolic",
      track: "media-playlist-repeat-song-symbolic",
      playlist: "media-playlist-repeat-symbolic"
    },
    playing: "media-playback-pause-symbolic",
    paused: "media-playback-start-symbolic",
    stopped: "media-playback-start-symbolic",
    prev: "media-skip-backward-symbolic",
    next: "media-skip-forward-symbolic"
  },
  system: {
    cpu: "org.gnome.SystemMonitor-symbolic",
    ram: "drive-harddisk-solidstate-symbolic",
    temp: "temperature-symbolic"
  },
  color: {
    dark: "dark-mode-symbolic",
    light: "light-mode-symbolic"
  }
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/lib/utils.ts
import Gdk2 from "gi://Gdk";
import GLib2 from "gi://GLib?version=2.0";
import GdkPixbuf2 from "gi://GdkPixbuf";
async function bash(strings, ...values) {
  const cmd = typeof strings === "string" ? strings : strings.flatMap((str, i) => str + `${values[i] ?? ""}`).join("");
  return Utils.execAsync(["bash", "-c", cmd]).catch((err) => {
    console.error(cmd, err);
    return "";
  });
}
async function sh(cmd) {
  return Utils.execAsync(cmd).catch((err) => {
    console.error(typeof cmd === "string" ? cmd : cmd.join(" "), err);
    return "";
  });
}
function forMonitors(widget) {
  const n = Gdk2.Display.get_default()?.get_n_monitors() || 1;
  return range(n, 0).flatMap(widget);
}
function range(length, start = 1) {
  return Array.from({ length }, (_, i) => i + start);
}
function dependencies(...bins) {
  const missing = bins.filter((bin) => Utils.exec({
    cmd: `which ${bin}`,
    out: () => false,
    err: () => true
  }));
  if (missing.length > 0) {
    console.warn(Error(`missing dependencies: ${missing.join(", ")}`));
    Notify({
      summary: "Dependencies not found!",
      body: `The following dependencies are missing: ${missing.join(", ")}`,
      iconName: icons_default.ui.warning,
      timeout: 7000
    });
  }
  return missing.length === 0;
}
function getPosition(pos) {
  const positionMap = {
    top: ["top"],
    "top right": ["top", "right"],
    "top left": ["top", "left"],
    bottom: ["bottom"],
    "bottom right": ["bottom", "right"],
    "bottom left": ["bottom", "left"],
    right: ["right"],
    left: ["left"]
  };
  return positionMap[pos] || ["top"];
}
var isAnImage = (imgFilePath) => {
  try {
    GdkPixbuf2.Pixbuf.new_from_file(imgFilePath);
    return true;
  } catch (error) {
    return false;
  }
};
var Notify = (notifPayload) => {
  let command = "notify-send";
  command += ` "${notifPayload.summary} "`;
  if (notifPayload.body)
    command += ` "${notifPayload.body}" `;
  if (notifPayload.appName)
    command += ` -a "${notifPayload.appName}"`;
  if (notifPayload.iconName)
    command += ` -i "${notifPayload.iconName}"`;
  if (notifPayload.urgency)
    command += ` -u "${notifPayload.urgency}"`;
  if (notifPayload.timeout !== undefined)
    command += ` -t ${notifPayload.timeout}`;
  if (notifPayload.category)
    command += ` -c "${notifPayload.category}"`;
  if (notifPayload.transient)
    command += ` -e`;
  if (notifPayload.id !== undefined)
    command += ` -r ${notifPayload.id}`;
  Utils.execAsync(command);
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/services/Wallpaper.ts
var hyprland = await Service.import("hyprland");
var WP = `${Utils.HOME}/.config/background`;

class Wallpaper extends Service {
  static {
    Service.register(this, {}, {
      wallpaper: ["string"]
    });
  }
  #blockMonitor = false;
  #isRunning = false;
  #wallpaper() {
    if (!dependencies("swww"))
      return;
    hyprland.monitors.map((m) => m.name);
    sh("hyprctl cursorpos").then((pos) => {
      sh([
        "swww",
        "img",
        "--invert-y",
        "--transition-type",
        "grow",
        "--transition-duration",
        "1.5",
        "--transition-fps",
        "30",
        "--transition-pos",
        pos.replace(" ", ""),
        WP
      ]).then(() => {
        this.changed("wallpaper");
      });
    });
  }
  async#setWallpaper(path) {
    this.#blockMonitor = true;
    await sh(`cp ${path} ${WP}`);
    this.#wallpaper();
    this.#blockMonitor = false;
  }
  set = (path) => {
    this.#setWallpaper(path);
  };
  isRunning = () => {
    return this.#isRunning;
  };
  get wallpaper() {
    return WP;
  }
  constructor() {
    super();
    options_default.wallpaper.enable.connect("changed", () => {
      if (options_default.wallpaper.enable.value) {
        this.#isRunning = true;
        Utils.execAsync("swww-daemon").then(() => {
          this.#wallpaper;
        }).catch(() => null);
      } else {
        this.#isRunning = false;
        Utils.execAsync("pkill swww-daemon").catch(() => null);
      }
    });
    if (!dependencies("swww") || !options_default.wallpaper.enable.value)
      return this;
    this.#isRunning = true;
    Utils.monitorFile(WP, () => {
      if (!this.#blockMonitor)
        this.#wallpaper();
    });
    Utils.execAsync("swww-daemon").then(() => {
      this.#wallpaper;
    }).catch(() => null);
  }
}
var Wallpaper_default = new Wallpaper;

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/scss/options_trackers.ts
var { matugen } = options_default.theme;
var { mode, scheme_type, contrast } = options_default.theme.matugen_settings;
var ensureMatugenWallpaper = () => {
  const wallpaperPath = options_default.wallpaper.image.value;
  if (matugen.value && (!options_default.wallpaper.image.value.length || !isAnImage(wallpaperPath))) {
    Notify({
      summary: "Matugen Failed",
      body: "Please select a wallpaper in 'Theming > General' first.",
      iconName: icons_default.ui.warning,
      timeout: 7000
    });
    matugen.value = false;
  }
};
var initializeTrackers = (resetCssFunc) => {
  matugen.connect("changed", () => {
    ensureMatugenWallpaper();
    options_default.resetTheme();
  });
  mode.connect("changed", () => {
    options_default.resetTheme();
  });
  scheme_type.connect("changed", () => {
    options_default.resetTheme();
  });
  contrast.connect("changed", () => {
    options_default.resetTheme();
  });
  Wallpaper_default.connect("changed", () => {
    console.info("Wallpaper changed, regenerating Matugen colors...");
    if (options_default.theme.matugen.value) {
      options_default.resetTheme();
      resetCssFunc();
    }
  });
  options_default.wallpaper.image.connect("changed", () => {
    if (!Wallpaper_default.isRunning() && options_default.theme.matugen.value || !options_default.wallpaper.enable.value) {
      console.info("Wallpaper path changed, regenerating Matugen colors...");
      options_default.resetTheme();
      resetCssFunc();
    }
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/lib/types/defaults/options.ts
var defaultColorMap = {
  rosewater: "#f5e0dc",
  flamingo: "#f2cdcd",
  pink: "#f5c2e7",
  mauve: "#cba6f7",
  red: "#f38ba8",
  maroon: "#eba0ac",
  peach: "#fab387",
  yellow: "#f9e2af",
  green: "#a6e3a1",
  teal: "#94e2d5",
  sky: "#89dceb",
  sapphire: "#74c7ec",
  blue: "#89b4fa",
  lavender: "#b4befe",
  text: "#cdd6f4",
  subtext1: "#bac2de",
  subtext2: "#a6adc8",
  overlay2: "#9399b2",
  overlay1: "#7f849c",
  overlay0: "#6c7086",
  surface2: "#585b70",
  surface1: "#45475a",
  surface0: "#313244",
  base2: "#242438",
  base: "#1e1e2e",
  mantle: "#181825",
  crust: "#11111b",
  surface1_2: "#454759",
  text2: "#cdd6f3",
  pink2: "#f5c2e6",
  red2: "#f38ba7",
  mantle2: "#181824",
  surface0_2: "#313243",
  surface2_2: "#585b69",
  overlay1_2: "#7f849b",
  lavender2: "#b4befd",
  mauve2: "#cba6f6",
  green2: "#a6e3a0",
  sky2: "#89dcea",
  teal2: "#94e2d4",
  yellow2: "#f9e2ad",
  maroon2: "#eba0ab",
  crust2: "#11111a",
  pink3: "#f5c2e8",
  red3: "#f38ba9",
  mantle3: "#181826",
  surface0_3: "#313245",
  surface2_3: "#585b71",
  overlay1_3: "#7f849d",
  lavender3: "#b4beff",
  mauve3: "#cba6f8",
  green3: "#a6e3a2",
  sky3: "#89dcec",
  teal3: "#94e2d6",
  yellow3: "#f9e2ae",
  maroon3: "#eba0ad",
  crust3: "#11111c"
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/services/matugen/variations.ts
var getMatugenVariations = (matugenColors, variation) => {
  const matVtns = {
    standard_1: {
      rosewater: matugenColors.secondary,
      flamingo: matugenColors.secondary,
      pink: matugenColors.tertiary,
      mauve: matugenColors.primary,
      red: matugenColors.tertiary,
      maroon: matugenColors.primary,
      peach: matugenColors.tertiary,
      yellow: matugenColors.secondary,
      green: matugenColors.primary,
      teal: matugenColors.secondary,
      sky: matugenColors.secondary,
      sapphire: matugenColors.primary,
      blue: matugenColors.primary,
      lavender: matugenColors.primary,
      text: matugenColors.on_background,
      subtext1: matugenColors.outline,
      subtext2: matugenColors.outline,
      overlay2: matugenColors.outline,
      overlay1: matugenColors.outline,
      overlay0: matugenColors.outline,
      surface2: matugenColors.outline,
      surface1: matugenColors.surface_bright,
      surface0: matugenColors.surface_bright,
      base2: matugenColors.inverse_on_surface,
      base: matugenColors.inverse_on_surface,
      mantle: matugenColors.surface_dim,
      crust: matugenColors.surface_dim,
      notifications_closer: matugenColors.primary,
      notifications_background: matugenColors.surface_dim,
      dashboard_btn_text: matugenColors.surface_dim,
      red2: matugenColors.tertiary,
      pink2: matugenColors.tertiary,
      mantle2: matugenColors.surface_dim,
      surface1_2: matugenColors.inverse_on_surface,
      surface0_2: matugenColors.surface_bright,
      overlay1_2: matugenColors.outline,
      text2: matugenColors.on_background,
      lavender2: matugenColors.primary,
      crust2: matugenColors.surface_dim,
      maroon2: matugenColors.primary,
      mauve2: matugenColors.primary,
      green2: matugenColors.primary,
      surface2_2: matugenColors.surface,
      sky2: matugenColors.secondary,
      teal2: matugenColors.secondary,
      yellow2: matugenColors.secondary,
      pink3: matugenColors.tertiary,
      red3: matugenColors.tertiary,
      mantle3: matugenColors.inverse_on_surface,
      surface0_3: matugenColors.outline,
      surface2_3: matugenColors.outline,
      overlay1_3: matugenColors.outline,
      lavender3: matugenColors.primary,
      mauve3: matugenColors.primary,
      green3: matugenColors.primary,
      sky3: matugenColors.secondary,
      teal3: matugenColors.secondary,
      yellow3: matugenColors.secondary,
      maroon3: matugenColors.primary,
      crust3: matugenColors.surface_dim
    },
    standard_2: {
      rosewater: matugenColors.primary,
      flamingo: matugenColors.primary,
      pink: matugenColors.tertiary,
      mauve: matugenColors.secondary,
      red: matugenColors.tertiary,
      maroon: matugenColors.secondary,
      peach: matugenColors.tertiary,
      yellow: matugenColors.primary,
      green: matugenColors.secondary,
      teal: matugenColors.primary,
      sky: matugenColors.primary,
      sapphire: matugenColors.secondary,
      blue: matugenColors.secondary,
      lavender: matugenColors.secondary,
      text: matugenColors.on_background,
      subtext1: matugenColors.outline,
      subtext2: matugenColors.outline,
      overlay2: matugenColors.outline,
      overlay1: matugenColors.outline,
      overlay0: matugenColors.outline,
      surface2: matugenColors.outline,
      surface1: matugenColors.surface_bright,
      surface0: matugenColors.surface_bright,
      base2: matugenColors.inverse_on_surface,
      base: matugenColors.inverse_on_surface,
      mantle: matugenColors.surface_dim,
      crust: matugenColors.surface_dim,
      notifications_closer: matugenColors.tertiary,
      notifications_background: matugenColors.surface_dim,
      dashboard_btn_text: matugenColors.surface_dim,
      red2: matugenColors.tertiary,
      pink2: matugenColors.tertiary,
      mantle2: matugenColors.surface_dim,
      surface1_2: matugenColors.inverse_on_surface,
      surface0_2: matugenColors.surface_bright,
      overlay1_2: matugenColors.outline,
      text2: matugenColors.on_background,
      lavender2: matugenColors.secondary,
      crust2: matugenColors.surface_dim,
      maroon2: matugenColors.secondary,
      surface2_2: matugenColors.surface,
      mauve2: matugenColors.secondary,
      green2: matugenColors.secondary,
      sky2: matugenColors.primary,
      teal2: matugenColors.primary,
      yellow2: matugenColors.primary,
      pink3: matugenColors.tertiary,
      red3: matugenColors.tertiary,
      mantle3: matugenColors.inverse_on_surface,
      surface0_3: matugenColors.outline,
      surface2_3: matugenColors.outline,
      overlay1_3: matugenColors.outline,
      lavender3: matugenColors.secondary,
      mauve3: matugenColors.secondary,
      green3: matugenColors.secondary,
      sky3: matugenColors.primary,
      teal3: matugenColors.primary,
      yellow3: matugenColors.primary,
      maroon3: matugenColors.secondary,
      crust3: matugenColors.surface_dim
    },
    standard_3: {
      rosewater: matugenColors.secondary,
      flamingo: matugenColors.secondary,
      pink: matugenColors.secondary,
      mauve: matugenColors.primary,
      red: matugenColors.secondary,
      maroon: matugenColors.primary,
      peach: matugenColors.secondary,
      yellow: matugenColors.secondary,
      green: matugenColors.primary,
      teal: matugenColors.secondary,
      sky: matugenColors.secondary,
      sapphire: matugenColors.primary,
      blue: matugenColors.primary,
      lavender: matugenColors.primary,
      text: matugenColors.on_background,
      subtext1: matugenColors.outline,
      subtext2: matugenColors.outline,
      overlay2: matugenColors.outline,
      overlay1: matugenColors.outline,
      overlay0: matugenColors.outline,
      surface2: matugenColors.outline,
      surface1: matugenColors.surface_bright,
      surface0: matugenColors.surface_bright,
      base2: matugenColors.inverse_on_surface,
      base: matugenColors.inverse_on_surface,
      mantle: matugenColors.surface_dim,
      crust: matugenColors.surface_dim,
      notifications_closer: matugenColors.secondary,
      notifications_background: matugenColors.surface_dim,
      dashboard_btn_text: matugenColors.surface_dim,
      red2: matugenColors.secondary,
      pink2: matugenColors.secondary,
      mantle2: matugenColors.surface_dim,
      surface1_2: matugenColors.inverse_on_surface,
      surface0_2: matugenColors.surface_bright,
      surface2_2: matugenColors.surface,
      overlay1_2: matugenColors.outline,
      text2: matugenColors.on_background,
      lavender2: matugenColors.primary,
      crust2: matugenColors.surface_dim,
      maroon2: matugenColors.primary,
      mauve2: matugenColors.primary,
      green2: matugenColors.primary,
      sky2: matugenColors.secondary,
      teal2: matugenColors.secondary,
      yellow2: matugenColors.secondary,
      pink3: matugenColors.secondary,
      red3: matugenColors.secondary,
      mantle3: matugenColors.inverse_on_surface,
      surface0_3: matugenColors.outline,
      surface2_3: matugenColors.outline,
      overlay1_3: matugenColors.outline,
      lavender3: matugenColors.primary,
      mauve3: matugenColors.primary,
      green3: matugenColors.primary,
      sky3: matugenColors.secondary,
      teal3: matugenColors.secondary,
      yellow3: matugenColors.secondary,
      maroon3: matugenColors.primary,
      crust3: matugenColors.surface_dim
    },
    vivid_1: {
      rosewater: matugenColors.surface,
      flamingo: matugenColors.surface,
      pink: matugenColors.surface,
      mauve: matugenColors.surface,
      red: matugenColors.surface,
      maroon: matugenColors.surface,
      peach: matugenColors.surface,
      yellow: matugenColors.surface,
      green: matugenColors.surface,
      teal: matugenColors.surface,
      sky: matugenColors.surface,
      sapphire: matugenColors.surface,
      blue: matugenColors.surface,
      lavender: matugenColors.surface,
      text: matugenColors.surface,
      subtext1: matugenColors.primary_container,
      subtext2: matugenColors.primary_container,
      overlay2: matugenColors.primary_container,
      overlay1: matugenColors.primary_container,
      overlay0: matugenColors.primary_container,
      surface2: matugenColors.surface_container_high,
      surface1: matugenColors.surface_container_high,
      surface0: matugenColors.surface_container_high,
      base2: matugenColors.primary,
      base: matugenColors.primary,
      mantle: matugenColors.surface_container_low,
      crust: matugenColors.surface_container_lowest,
      red2: matugenColors.primary_container,
      pink2: matugenColors.primary_container,
      mantle2: matugenColors.primary,
      surface1_2: matugenColors.primary,
      surface0_2: matugenColors.primary,
      overlay1_2: matugenColors.surface_container_high,
      text2: matugenColors.outline,
      lavender2: matugenColors.primary_container,
      crust2: matugenColors.primary,
      maroon2: matugenColors.primary_container,
      mauve2: matugenColors.primary_container,
      surface2_2: matugenColors.primary_container,
      green2: matugenColors.primary_container,
      sky2: matugenColors.primary_container,
      teal2: matugenColors.primary_container,
      yellow2: matugenColors.primary_container,
      pink3: matugenColors.primary_fixed,
      red3: matugenColors.primary,
      mantle3: matugenColors.primary,
      surface0_3: matugenColors.primary,
      surface2_3: matugenColors.outline,
      overlay1_3: matugenColors.primary,
      lavender3: matugenColors.primary,
      mauve3: matugenColors.primary,
      green3: matugenColors.primary_fixed,
      sky3: matugenColors.primary,
      teal3: matugenColors.primary,
      yellow3: matugenColors.primary_fixed,
      maroon3: matugenColors.primary_fixed,
      crust3: matugenColors.primary
    },
    vivid_2: {
      rosewater: matugenColors.surface,
      flamingo: matugenColors.surface,
      pink: matugenColors.surface,
      mauve: matugenColors.surface,
      red: matugenColors.surface,
      maroon: matugenColors.surface,
      peach: matugenColors.surface,
      yellow: matugenColors.surface,
      green: matugenColors.surface,
      teal: matugenColors.surface,
      sky: matugenColors.surface,
      sapphire: matugenColors.surface,
      blue: matugenColors.surface,
      lavender: matugenColors.surface,
      text: matugenColors.surface,
      subtext1: matugenColors.secondary_container,
      subtext2: matugenColors.secondary_container,
      overlay2: matugenColors.secondary_container,
      overlay1: matugenColors.secondary_container,
      overlay0: matugenColors.secondary_container,
      surface2: matugenColors.surface_container_high,
      surface1: matugenColors.surface_container_high,
      surface0: matugenColors.surface_container_high,
      base2: matugenColors.secondary,
      base: matugenColors.secondary,
      mantle: matugenColors.surface_container_low,
      crust: matugenColors.surface_container_lowest,
      red2: matugenColors.secondary_container,
      pink2: matugenColors.secondary_container,
      surface2_2: matugenColors.primary_container,
      mantle2: matugenColors.secondary,
      surface1_2: matugenColors.secondary,
      surface0_2: matugenColors.secondary,
      overlay1_2: matugenColors.surface_container_high,
      text2: matugenColors.outline,
      lavender2: matugenColors.secondary_container,
      crust2: matugenColors.secondary,
      maroon2: matugenColors.secondary_container,
      mauve2: matugenColors.secondary_container,
      green2: matugenColors.secondary_container,
      sky2: matugenColors.secondary_container,
      teal2: matugenColors.secondary_container,
      yellow2: matugenColors.secondary_container,
      pink3: matugenColors.secondary_fixed,
      red3: matugenColors.secondary,
      mantle3: matugenColors.secondary,
      surface0_3: matugenColors.secondary,
      surface2_3: matugenColors.outline,
      overlay1_3: matugenColors.secondary,
      lavender3: matugenColors.secondary,
      mauve3: matugenColors.secondary,
      green3: matugenColors.secondary_fixed,
      sky3: matugenColors.secondary,
      teal3: matugenColors.secondary,
      yellow3: matugenColors.secondary_fixed,
      maroon3: matugenColors.secondary_fixed,
      crust3: matugenColors.secondary
    },
    vivid_3: {
      rosewater: matugenColors.surface,
      flamingo: matugenColors.surface,
      pink: matugenColors.surface,
      mauve: matugenColors.surface,
      red: matugenColors.surface,
      maroon: matugenColors.surface,
      peach: matugenColors.surface,
      yellow: matugenColors.surface,
      green: matugenColors.surface,
      teal: matugenColors.surface,
      sky: matugenColors.surface,
      sapphire: matugenColors.surface,
      blue: matugenColors.surface,
      lavender: matugenColors.surface,
      text: matugenColors.surface,
      subtext1: matugenColors.tertiary_container,
      subtext2: matugenColors.tertiary_container,
      overlay2: matugenColors.tertiary_container,
      overlay1: matugenColors.tertiary_container,
      overlay0: matugenColors.tertiary_container,
      surface2: matugenColors.surface_container_high,
      surface1: matugenColors.surface_container_high,
      surface0: matugenColors.surface_container_high,
      base2: matugenColors.tertiary,
      base: matugenColors.tertiary,
      mantle: matugenColors.surface_container_low,
      crust: matugenColors.surface_container_lowest,
      red2: matugenColors.tertiary_container,
      pink2: matugenColors.tertiary_container,
      mantle2: matugenColors.tertiary,
      surface1_2: matugenColors.tertiary,
      surface0_2: matugenColors.tertiary,
      overlay1_2: matugenColors.surface_container_high,
      text2: matugenColors.outline,
      lavender2: matugenColors.tertiary_container,
      surface2_2: matugenColors.primary_container,
      crust2: matugenColors.tertiary,
      maroon2: matugenColors.tertiary_container,
      mauve2: matugenColors.tertiary_container,
      green2: matugenColors.tertiary_container,
      sky2: matugenColors.tertiary_container,
      teal2: matugenColors.tertiary_container,
      yellow2: matugenColors.tertiary_container,
      pink3: matugenColors.tertiary_fixed,
      red3: matugenColors.tertiary,
      mantle3: matugenColors.tertiary,
      surface0_3: matugenColors.tertiary,
      surface2_3: matugenColors.outline,
      overlay1_3: matugenColors.tertiary,
      lavender3: matugenColors.tertiary,
      mauve3: matugenColors.tertiary,
      green3: matugenColors.tertiary_fixed,
      sky3: matugenColors.tertiary,
      teal3: matugenColors.tertiary,
      yellow3: matugenColors.tertiary_fixed,
      maroon3: matugenColors.tertiary_fixed,
      crust3: matugenColors.tertiary
    },
    monochrome_1: {
      rosewater: matugenColors.primary,
      flamingo: matugenColors.primary,
      pink: matugenColors.primary,
      mauve: matugenColors.primary,
      red: matugenColors.primary,
      maroon: matugenColors.primary,
      peach: matugenColors.primary,
      yellow: matugenColors.primary,
      green: matugenColors.primary,
      teal: matugenColors.primary,
      sky: matugenColors.primary,
      sapphire: matugenColors.primary,
      blue: matugenColors.primary,
      lavender: matugenColors.primary,
      text: matugenColors.on_background,
      subtext1: matugenColors.outline,
      subtext2: matugenColors.outline,
      overlay2: matugenColors.outline,
      overlay1: matugenColors.outline,
      overlay0: matugenColors.outline,
      surface2: matugenColors.outline,
      surface1: matugenColors.surface_bright,
      surface0: matugenColors.surface_bright,
      base2: matugenColors.inverse_on_surface,
      base: matugenColors.inverse_on_surface,
      mantle: matugenColors.surface_dim,
      crust: matugenColors.surface_dim,
      notifications_closer: matugenColors.primary,
      notifications_background: matugenColors.surface_dim,
      dashboard_btn_text: matugenColors.surface_dim,
      red2: matugenColors.primary,
      pink2: matugenColors.primary,
      mantle2: matugenColors.surface_dim,
      surface1_2: matugenColors.inverse_on_surface,
      surface0_2: matugenColors.surface_bright,
      surface2_2: matugenColors.surface,
      overlay1_2: matugenColors.outline,
      text2: matugenColors.on_background,
      lavender2: matugenColors.primary,
      crust2: matugenColors.surface_dim,
      maroon2: matugenColors.primary,
      mauve2: matugenColors.primary,
      green2: matugenColors.primary,
      sky2: matugenColors.primary,
      teal2: matugenColors.primary,
      yellow2: matugenColors.primary,
      pink3: matugenColors.primary,
      red3: matugenColors.primary,
      mantle3: matugenColors.inverse_on_surface,
      surface0_3: matugenColors.outline,
      surface2_3: matugenColors.outline,
      overlay1_3: matugenColors.outline,
      lavender3: matugenColors.primary,
      mauve3: matugenColors.primary,
      green3: matugenColors.primary,
      sky3: matugenColors.primary,
      teal3: matugenColors.primary,
      yellow3: matugenColors.primary,
      maroon3: matugenColors.primary,
      crust3: matugenColors.surface_dim
    },
    monochrome_2: {
      rosewater: matugenColors.secondary,
      flamingo: matugenColors.secondary,
      pink: matugenColors.secondary,
      mauve: matugenColors.secondary,
      red: matugenColors.secondary,
      maroon: matugenColors.secondary,
      peach: matugenColors.secondary,
      yellow: matugenColors.secondary,
      green: matugenColors.secondary,
      teal: matugenColors.secondary,
      sky: matugenColors.secondary,
      sapphire: matugenColors.secondary,
      blue: matugenColors.secondary,
      lavender: matugenColors.secondary,
      text: matugenColors.on_background,
      subtext1: matugenColors.outline,
      subtext2: matugenColors.outline,
      overlay2: matugenColors.outline,
      overlay1: matugenColors.outline,
      overlay0: matugenColors.outline,
      surface2: matugenColors.outline,
      surface1: matugenColors.surface_bright,
      surface0: matugenColors.surface_bright,
      base2: matugenColors.inverse_on_surface,
      base: matugenColors.inverse_on_surface,
      mantle: matugenColors.surface_dim,
      crust: matugenColors.surface_dim,
      notifications_closer: matugenColors.secondary,
      notifications_background: matugenColors.surface_dim,
      dashboard_btn_text: matugenColors.surface_dim,
      red2: matugenColors.secondary,
      pink2: matugenColors.secondary,
      mantle2: matugenColors.surface_dim,
      surface1_2: matugenColors.inverse_on_surface,
      surface0_2: matugenColors.surface_bright,
      overlay1_2: matugenColors.outline,
      surface2_2: matugenColors.surface,
      text2: matugenColors.on_background,
      lavender2: matugenColors.secondary,
      crust2: matugenColors.surface_dim,
      maroon2: matugenColors.secondary,
      mauve2: matugenColors.secondary,
      green2: matugenColors.secondary,
      sky2: matugenColors.secondary,
      teal2: matugenColors.secondary,
      yellow2: matugenColors.secondary,
      pink3: matugenColors.secondary,
      red3: matugenColors.secondary,
      mantle3: matugenColors.inverse_on_surface,
      surface0_3: matugenColors.outline,
      surface2_3: matugenColors.outline,
      overlay1_3: matugenColors.outline,
      lavender3: matugenColors.secondary,
      mauve3: matugenColors.secondary,
      green3: matugenColors.secondary,
      sky3: matugenColors.secondary,
      teal3: matugenColors.secondary,
      yellow3: matugenColors.secondary,
      maroon3: matugenColors.secondary,
      crust3: matugenColors.surface_dim
    },
    monochrome_3: {
      rosewater: matugenColors.tertiary,
      flamingo: matugenColors.tertiary,
      pink: matugenColors.tertiary,
      mauve: matugenColors.tertiary,
      red: matugenColors.tertiary,
      maroon: matugenColors.tertiary,
      peach: matugenColors.tertiary,
      yellow: matugenColors.tertiary,
      green: matugenColors.tertiary,
      teal: matugenColors.tertiary,
      sky: matugenColors.tertiary,
      sapphire: matugenColors.tertiary,
      blue: matugenColors.tertiary,
      lavender: matugenColors.tertiary,
      text: matugenColors.on_background,
      subtext1: matugenColors.outline,
      subtext2: matugenColors.outline,
      overlay2: matugenColors.outline,
      overlay1: matugenColors.outline,
      overlay0: matugenColors.outline,
      surface2: matugenColors.outline,
      surface1: matugenColors.surface_bright,
      surface0: matugenColors.surface_bright,
      base2: matugenColors.inverse_on_surface,
      base: matugenColors.inverse_on_surface,
      mantle: matugenColors.surface_dim,
      crust: matugenColors.surface_dim,
      notifications_closer: matugenColors.tertiary,
      notifications_background: matugenColors.surface_dim,
      dashboard_btn_text: matugenColors.surface_dim,
      red2: matugenColors.tertiary,
      pink2: matugenColors.tertiary,
      mantle2: matugenColors.surface_dim,
      surface1_2: matugenColors.inverse_on_surface,
      surface0_2: matugenColors.surface_bright,
      overlay1_2: matugenColors.outline,
      text2: matugenColors.on_background,
      lavender2: matugenColors.tertiary,
      crust2: matugenColors.surface_dim,
      maroon2: matugenColors.tertiary,
      surface2_2: matugenColors.surface,
      mauve2: matugenColors.tertiary,
      green2: matugenColors.tertiary,
      sky2: matugenColors.tertiary,
      teal2: matugenColors.tertiary,
      yellow2: matugenColors.tertiary,
      pink3: matugenColors.tertiary,
      red3: matugenColors.tertiary,
      mantle3: matugenColors.inverse_on_surface,
      surface0_3: matugenColors.outline,
      surface2_3: matugenColors.outline,
      overlay1_3: matugenColors.outline,
      lavender3: matugenColors.tertiary,
      mauve3: matugenColors.tertiary,
      green3: matugenColors.tertiary,
      sky3: matugenColors.tertiary,
      teal3: matugenColors.tertiary,
      yellow3: matugenColors.tertiary,
      maroon3: matugenColors.tertiary,
      crust3: matugenColors.surface_dim
    }
  };
  return matVtns[variation];
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/services/matugen/index.ts
async function generateMatugenColors() {
  if (!matugen2.value || !dependencies("matugen")) {
    return;
  }
  const wallpaperPath = options_default.wallpaper.image.value;
  try {
    if (!wallpaperPath.length || !isAnImage(wallpaperPath)) {
      Notify({
        summary: "Matugen Failed",
        body: "Please select a wallpaper in 'Theming > General' first.",
        iconName: icons_default.ui.warning,
        timeout: 7000
      });
      return;
    }
    const normalizedContrast = contrast2.value > 1 ? 1 : contrast2.value < -1 ? -1 : contrast2.value;
    const contents = await bash(`matugen image ${wallpaperPath} -t scheme-${scheme_type2.value} --contrast ${normalizedContrast} --json hex`);
    return JSON.parse(contents).colors[options_default.theme.matugen_settings.mode.value];
  } catch (error) {
    const errMsg = `An error occurred while generating matugen colors: ${error}`;
    console.error(errMsg);
    return;
  }
}
var { scheme_type: scheme_type2, contrast: contrast2 } = options_default.theme.matugen_settings;
var { matugen: matugen2 } = options_default.theme;
var updateOptColor = (color, opt2) => {
  opt2.value = color;
};
var replaceHexValues = (incomingHex, matugenColors) => {
  if (!options_default.theme.matugen.value) {
    return incomingHex;
  }
  const matugenVariation = getMatugenVariations(matugenColors, options_default.theme.matugen_settings.variation.value);
  updateOptColor(matugenVariation.base, options_default.theme.bar.menus.menu.media.card.color);
  for (let curColor of Object.keys(defaultColorMap)) {
    if (defaultColorMap[curColor] === incomingHex) {
      return matugenVariation[curColor];
    }
  }
  return incomingHex;
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/scss/style.ts
function extractVariables(theme, prefix = "", matugenColors) {
  let result = [];
  for (let key in theme) {
    if (theme.hasOwnProperty(key)) {
      const value = theme[key];
      const newPrefix = prefix ? `${prefix}-${key}` : key;
      const isColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value.value);
      const replacedValue = isColor && matugenColors !== undefined ? replaceHexValues(value.value, matugenColors) : value.value;
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        if (typeof value.value !== "undefined") {
          result.push(`\$${newPrefix}: ${replacedValue};`);
        } else {
          result = result.concat(extractVariables(value, newPrefix, matugenColors));
        }
      } else if (typeof value === "function" && value.name === "opt") {
        result.push(`\$${newPrefix}: ${replacedValue};`);
      }
    }
  }
  return result;
}
async function resetCss() {
  if (!dependencies("sass"))
    return;
  try {
    const matugenColors = await generateMatugenColors();
    const variables = [
      ...extractVariables(options_default.theme, "", matugenColors)
    ];
    const vars = `${TMP}/variables.scss`;
    const css = `${TMP}/main.css`;
    const scss = `${TMP}/entry.scss`;
    const localScss = `${App.configDir}/scss/main.scss`;
    const themeVariables = variables;
    const integratedVariables = themeVariables;
    const imports2 = [vars].map((f) => `@import '${f}';`);
    await Utils.writeFile(integratedVariables.join("\n"), vars);
    let mainScss = Utils.readFile(localScss);
    mainScss = `${imports2}\n${mainScss}`;
    await Utils.writeFile(mainScss, scss);
    await bash(`sass --load-path=${App.configDir}/scss/ ${scss} ${css}`);
    App.applyCss(css, true);
  } catch (error) {
    error instanceof Error ? logError(error) : console.error(error);
  }
}
var deps = [
  "font",
  "theme",
  "bar.flatButtons",
  "bar.position",
  "bar.battery.charging",
  "bar.battery.blocks"
];
initializeTrackers(resetCss);
Utils.monitorFile(`${App.configDir}/scss/style`, resetCss);
options_default.handler(deps, resetCss);
await resetCss();

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/globals/useTheme.ts
import Gio2 from "gi://Gio";
globalThis.useTheme = (filePath) => {
  const themeOnly = true;
  let file = Gio2.File.new_for_path(filePath);
  let [success, content] = file.load_contents(null);
  if (!success) {
    console.error(`Failed to import: ${filePath}`);
    return;
  }
  Notify({
    summary: `Importing ${themeOnly ? "Theme" : "Config"}`,
    body: `Importing: ${filePath}`,
    iconName: icons_default.ui.info,
    timeout: 7000
  });
  let jsonString = new TextDecoder("utf-8").decode(content);
  let importedConfig = JSON.parse(jsonString);
  const hexColorPattern = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
  const saveConfigToFile = (config, filePath2) => {
    let file2 = Gio2.File.new_for_path(filePath2);
    let outputStream = file2.replace(null, false, Gio2.FileCreateFlags.NONE, null);
    let dataOutputStream = new Gio2.DataOutputStream({ base_stream: outputStream });
    let jsonString2 = JSON.stringify(config, null, 2);
    dataOutputStream.put_string(jsonString2, null);
    dataOutputStream.close(null);
  };
  const filterConfigForThemeOnly = (config) => {
    let filteredConfig = {};
    for (let key in config) {
      if (typeof config[key] === "string" && hexColorPattern.test(config[key])) {
        filteredConfig[key] = config[key];
      }
    }
    return filteredConfig;
  };
  const filterConfigForNonTheme = (config) => {
    let filteredConfig = {};
    for (let key in config) {
      if (!(typeof config[key] === "string" && hexColorPattern.test(config[key]))) {
        filteredConfig[key] = config[key];
      }
    }
    return filteredConfig;
  };
  let tmpConfigFile = Gio2.File.new_for_path(`${TMP}/config.json`);
  let optionsConfigFile = Gio2.File.new_for_path(OPTIONS);
  let [tmpSuccess, tmpContent] = tmpConfigFile.load_contents(null);
  let [optionsSuccess, optionsContent] = optionsConfigFile.load_contents(null);
  if (!tmpSuccess || !optionsSuccess) {
    console.error("Failed to read existing configuration files.");
    return;
  }
  let tmpConfig = JSON.parse(new TextDecoder("utf-8").decode(tmpContent));
  let optionsConfig = JSON.parse(new TextDecoder("utf-8").decode(optionsContent));
  if (themeOnly) {
    const filteredConfig = filterConfigForThemeOnly(importedConfig);
    tmpConfig = { ...tmpConfig, ...filteredConfig };
    optionsConfig = { ...optionsConfig, ...filteredConfig };
  } else {
    const filteredConfig = filterConfigForNonTheme(importedConfig);
    tmpConfig = { ...tmpConfig, ...filteredConfig };
    optionsConfig = { ...optionsConfig, ...filteredConfig };
  }
  saveConfigToFile(tmpConfig, `${TMP}/config.json`);
  saveConfigToFile(optionsConfig, OPTIONS);
  bash("pkill ags && ags");
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/globals/mousePos.ts
var globalMousePosVar = Variable([0, 0]);
globalThis["globalMousePos"] = globalMousePosVar;

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/bar/utils.ts
var closeAllMenus = () => {
  const menuWindows = App.windows.filter((w) => {
    if (w.name) {
      return /.*menu/.test(w.name);
    }
    return false;
  }).map((w) => w.name);
  menuWindows.forEach((w) => {
    if (w) {
      App.closeWindow(w);
    }
  });
};
var openMenu = (clicked, event, window) => {
  const middleOfButton = Math.floor(clicked.get_allocated_width() / 2);
  const xAxisOfButtonClick = clicked.get_pointer()[0];
  const middleOffset = middleOfButton - xAxisOfButtonClick;
  const clickPos = event.get_root_coords();
  const adjustedXCoord = clickPos[1] + middleOffset;
  const coords = [adjustedXCoord, clickPos[2]];
  globalMousePos.value = coords;
  closeAllMenus();
  App.toggleWindow(window);
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/bar/menu/index.ts
var Menu = () => {
  return {
    component: Widget.Box({
      child: Widget.Label({
        class_name: "bar-menu_label txt-icon bar",
        label: options_default.bar.launcher.icon.bind("value")
      })
    }),
    isVisible: true,
    boxClass: "dashboard",
    props: {
      on_primary_click: (clicked, event) => {
        openMenu(clicked, event, "dashboardmenu");
      }
    }
  };
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/bar/workspaces/index.ts
function range2(length, start = 1) {
  return Array.from({ length }, (_, i) => i + start);
}
var hyprland2 = await Service.import("hyprland");
var {
  workspaces,
  monitorSpecific,
  workspaceMask,
  reverse_scroll,
  scroll_speed,
  spacing
} = options_default.bar.workspaces;
var Workspaces = (monitor = -1, ws = 8) => {
  const getWorkspacesForMonitor = (curWs, wsRules) => {
    if (!wsRules || !Object.keys(wsRules).length) {
      return true;
    }
    const monitorMap = {};
    hyprland2.monitors.forEach((m) => monitorMap[m.id] = m.name);
    const currentMonitorName = monitorMap[monitor];
    const monitorWSRules = wsRules[currentMonitorName];
    if (monitorWSRules === undefined) {
      return true;
    }
    return monitorWSRules.includes(curWs);
  };
  const getWorkspaceRules = () => {
    try {
      const rules = Utils.exec("hyprctl workspacerules -j");
      const workspaceRules = {};
      JSON.parse(rules).forEach((rule, index) => {
        if (Object.hasOwnProperty.call(workspaceRules, rule.monitor)) {
          workspaceRules[rule.monitor].push(index + 1);
        } else {
          workspaceRules[rule.monitor] = [index + 1];
        }
      });
      return workspaceRules;
    } catch (err) {
      console.error(err);
      return {};
    }
  };
  const getCurrentMonitorWorkspaces = () => {
    if (hyprland2.monitors.length === 1) {
      return Array.from({ length: workspaces.value }, (_, i) => i + 1);
    }
    const monitorWorkspaces = getWorkspaceRules();
    const monitorMap = {};
    hyprland2.monitors.forEach((m) => monitorMap[m.id] = m.name);
    const currentMonitorName = monitorMap[monitor];
    return monitorWorkspaces[currentMonitorName];
  };
  const currentMonitorWorkspaces = Variable(getCurrentMonitorWorkspaces());
  workspaces.connect("changed", () => {
    currentMonitorWorkspaces.value = getCurrentMonitorWorkspaces();
  });
  const goToNextWS = () => {
    if (currentMonitorWorkspaces.value === undefined) {
      let nextIndex = hyprland2.active.workspace.id + 1;
      if (nextIndex > workspaces.value) {
        nextIndex = 0;
      }
      hyprland2.messageAsync(`dispatch workspace ${nextIndex}`);
    } else {
      const curWorkspace = hyprland2.active.workspace.id;
      const indexOfWs = currentMonitorWorkspaces.value.indexOf(curWorkspace);
      let nextIndex = indexOfWs + 1;
      if (nextIndex >= currentMonitorWorkspaces.value.length) {
        nextIndex = 0;
      }
      hyprland2.messageAsync(`dispatch workspace ${currentMonitorWorkspaces.value[nextIndex]}`);
    }
  };
  const goToPrevWS = () => {
    if (currentMonitorWorkspaces.value === undefined) {
      let prevIndex = hyprland2.active.workspace.id - 1;
      if (prevIndex <= 0) {
        prevIndex = workspaces.value;
      }
      hyprland2.messageAsync(`dispatch workspace ${prevIndex}`);
    } else {
      const curWorkspace = hyprland2.active.workspace.id;
      const indexOfWs = currentMonitorWorkspaces.value.indexOf(curWorkspace);
      let prevIndex = indexOfWs - 1;
      if (prevIndex < 0) {
        prevIndex = currentMonitorWorkspaces.value.length - 1;
      }
      hyprland2.messageAsync(`dispatch workspace ${currentMonitorWorkspaces.value[prevIndex]}`);
    }
  };
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  }
  const createThrottledScrollHandlers = (scrollSpeed) => {
    const throttledScrollUp = throttle(() => {
      if (reverse_scroll.value === true) {
        goToPrevWS();
      } else {
        goToNextWS();
      }
    }, 200 / scrollSpeed);
    const throttledScrollDown = throttle(() => {
      if (reverse_scroll.value === true) {
        goToNextWS();
      } else {
        goToPrevWS();
      }
    }, 200 / scrollSpeed);
    return { throttledScrollUp, throttledScrollDown };
  };
  return {
    component: Widget.Box({
      class_name: "workspaces",
      children: Utils.merge([workspaces.bind(), monitorSpecific.bind()], (workspaces2, monitorSpecific2) => {
        return range2(workspaces2 || 8).filter((i) => {
          if (!monitorSpecific2) {
            return true;
          }
          const workspaceRules = getWorkspaceRules();
          return getWorkspacesForMonitor(i, workspaceRules);
        }).map((i, index) => {
          return Widget.Button({
            class_name: "workspace-button",
            on_primary_click: () => {
              hyprland2.messageAsync(`dispatch workspace ${i}`);
            },
            child: Widget.Label({
              attribute: i,
              vpack: "center",
              css: spacing.bind("value").as((sp) => `margin: 0rem ${0.375 * sp}rem;`),
              class_name: Utils.merge([
                options_default.bar.workspaces.show_icons.bind("value"),
                options_default.bar.workspaces.show_numbered.bind("value"),
                options_default.bar.workspaces.numbered_active_indicator.bind("value"),
                options_default.bar.workspaces.icons.available.bind("value"),
                options_default.bar.workspaces.icons.active.bind("value"),
                options_default.bar.workspaces.icons.occupied.bind("value"),
                hyprland2.active.workspace.bind("id")
              ], (show_icons, show_numbered, numbered_active_indicator) => {
                if (show_icons) {
                  return `workspace-icon txt-icon bar`;
                }
                if (show_numbered) {
                  const numActiveInd = hyprland2.active.workspace.id === i ? numbered_active_indicator : "";
                  return `workspace-number ${numActiveInd}`;
                }
                return "";
              }),
              label: Utils.merge([
                options_default.bar.workspaces.show_icons.bind("value"),
                options_default.bar.workspaces.icons.available.bind("value"),
                options_default.bar.workspaces.icons.active.bind("value"),
                options_default.bar.workspaces.icons.occupied.bind("value"),
                workspaceMask.bind("value"),
                hyprland2.active.workspace.bind("id")
              ], (showIcons, available, active, occupied, workspaceMask2, _) => {
                if (showIcons) {
                  if (hyprland2.active.workspace.id === i) {
                    return active;
                  }
                  if ((hyprland2.getWorkspace(i)?.windows || 0) > 0) {
                    return occupied;
                  }
                  if (monitor !== -1) {
                    return available;
                  }
                }
                return workspaceMask2 ? `${index + 1}` : `${i}`;
              }),
              setup: (self) => {
                self.hook(hyprland2, () => {
                  self.toggleClassName("active", hyprland2.active.workspace.id === i);
                  self.toggleClassName("occupied", (hyprland2.getWorkspace(i)?.windows || 0) > 0);
                });
              }
            })
          });
        });
      }),
      setup: (box) => {
        if (ws === 0) {
          box.hook(hyprland2.active.workspace, () => box.children.map((btn) => {
            btn.visible = hyprland2.workspaces.some((ws2) => ws2.id === btn.attribute);
          }));
        }
      }
    }),
    isVisible: true,
    boxClass: "workspaces",
    props: {
      setup: (self) => {
        self.hook(scroll_speed, () => {
          const { throttledScrollUp, throttledScrollDown } = createThrottledScrollHandlers(scroll_speed.value);
          self.on_scroll_up = throttledScrollUp;
          self.on_scroll_down = throttledScrollDown;
        });
      }
    }
  };
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/bar/window_title/index.ts
var hyprland3 = await Service.import("hyprland");
var filterTitle = (windowtitle) => {
  const windowTitleMap = [
    ...options_default.bar.windowtitle.title_map.value,
    ["kitty", "\uDB80\uDD1B", "Kitty Terminal"],
    ["firefox", "\uDB80\uDE39", "Firefox"],
    ["microsoft-edge", "\uDB80\uDDE9", "Edge"],
    ["discord", "\uF1FF", "Discord"],
    ["vesktop", "\uF1FF", "Vesktop"],
    ["org.kde.dolphin", "\uF07C", "Dolphin"],
    ["plex", "\uDB81\uDEBA", "Plex"],
    ["steam", "\uF1B6", "Steam"],
    ["spotify", "\uDB81\uDCC7", "Spotify"],
    ["ristretto", "\uDB80\uDEE9", "Ristretto"],
    ["obsidian", "\uDB85\uDCE7", "Obsidian"],
    ["google-chrome", "\uF268", "Google Chrome"],
    ["brave-browser", "\uDB81\uDD9F", "Brave Browser"],
    ["chromium", "\uF268", "Chromium"],
    ["opera", "\uF26A", "Opera"],
    ["vivaldi", "\uDB81\uDD9F", "Vivaldi"],
    ["waterfox", "\uDB81\uDD9F", "Waterfox"],
    ["thorium", "\uDB81\uDD9F", "Waterfox"],
    ["tor-browser", "\uF371", "Tor Browser"],
    ["gnome-terminal", "\uE795", "GNOME Terminal"],
    ["konsole", "\uE795", "Konsole"],
    ["alacritty", "\uE795", "Alacritty"],
    ["wezterm", "\uE795", "Wezterm"],
    ["foot", "\uDB83\uDF52", "Foot Terminal"],
    ["tilix", "\uE795", "Tilix"],
    ["xterm", "\uE795", "XTerm"],
    ["urxvt", "\uE795", "URxvt"],
    ["st", "\uE795", "st Terminal"],
    ["code", "\uDB82\uDE1E", "Visual Studio Code"],
    ["vscode", "\uDB82\uDE1E", "VS Code"],
    ["sublime-text", "\uE7AA", "Sublime Text"],
    ["atom", "\uE764", "Atom"],
    ["android-studio", "\uDB80\uDC34", "Android Studio"],
    ["intellij-idea", "\uE7B5", "IntelliJ IDEA"],
    ["pycharm", "\uDB84\uDCD6", "PyCharm"],
    ["webstorm", "\uDB84\uDCD6", "WebStorm"],
    ["phpstorm", "\uDB84\uDCD6", "PhpStorm"],
    ["eclipse", "\uE79E", "Eclipse"],
    ["netbeans", "\uE79B", "NetBeans"],
    ["docker", "\uF21F", "Docker"],
    ["vim", "\uE7C5", "Vim"],
    ["neovim", "\uF36F", "Neovim"],
    ["emacs", "\uE632", "Emacs"],
    ["slack", "\uDB81\uDCB1", "Slack"],
    ["telegram-desktop", "\uF2C6", "Telegram"],
    ["org.telegram.desktop", "\uE217", "Telegram"],
    ["whatsapp", "\uDB81\uDDA3", "WhatsApp"],
    ["teams", "\uDB80\uDEBB", "Microsoft Teams"],
    ["skype", "\uDB81\uDCAF", "Skype"],
    ["thunderbird", "\uF370", "Thunderbird"],
    ["nautilus", "\uDB81\uDF70", "Files (Nautilus)"],
    ["thunar", "\uDB81\uDF70", "Thunar"],
    ["pcmanfm", "\uDB81\uDF70", "PCManFM"],
    ["nemo", "\uDB81\uDF70", "Nemo"],
    ["ranger", "\uDB81\uDF70", "Ranger"],
    ["doublecmd", "\uDB81\uDF70", "Double Commander"],
    ["krusader", "\uDB81\uDF70", "Krusader"],
    ["vlc", "\uDB81\uDD7C", "VLC Media Player"],
    ["mpv", "\uF36E", "MPV"],
    ["rhythmbox", "\uDB81\uDCC3", "Rhythmbox"],
    ["gimp", "\uF338", "GIMP"],
    ["inkscape", "\uF33B", "Inkscape"],
    ["krita", "\uF33D", "Krita"],
    ["blender", "\uDB80\uDCAB", "Blender"],
    ["kdenlive", "\uF33C", "Kdenlive"],
    ["lutris", "\uDB83\uDEB5", "Lutris"],
    ["heroic", "\uDB83\uDEB5", "Heroic Games Launcher"],
    ["minecraft", "\uDB80\uDF73", "Minecraft"],
    ["csgo", "\uDB83\uDEB5", "CS:GO"],
    ["dota2", "\uDB83\uDEB5", "Dota 2"],
    ["evernote", "\uEF98", "Evernote"],
    ["dropbox", "\uDB80\uDDE3", "Dropbox"],
    ["^$", "\uDB80\uDDC4", "Desktop"],
    ["(.+)", "\uDB82\uDCC6", `${windowtitle.class.charAt(0).toUpperCase() + windowtitle.class.slice(1)}`]
  ];
  const foundMatch = windowTitleMap.find((wt) => RegExp(wt[0]).test(windowtitle.class.toLowerCase()));
  if (!foundMatch || foundMatch.length !== 3) {
    return {
      icon: windowTitleMap[windowTitleMap.length - 1][1],
      label: windowTitleMap[windowTitleMap.length - 1][2]
    };
  }
  return {
    icon: foundMatch ? foundMatch[1] : windowTitleMap[windowTitleMap.length - 1][1],
    label: foundMatch ? foundMatch[2] : windowTitleMap[windowTitleMap.length - 1][2]
  };
};
var ClientTitle = () => {
  return {
    component: Widget.Box({
      children: [
        Widget.Label({
          class_name: "bar-button-icon windowtitle txt-icon bar",
          label: hyprland3.active.bind("client").as((v) => filterTitle(v).icon)
        }),
        Widget.Label({
          class_name: "bar-button-label windowtitle",
          label: hyprland3.active.bind("client").as((v) => filterTitle(v).label)
        })
      ]
    }),
    isVisible: true,
    boxClass: "windowtitle"
  };
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/lib/shared/media.ts
var mpris = await Service.import("mpris");
var getCurrentPlayer = (activePlayer = mpris.players[0]) => {
  const statusOrder = {
    Playing: 1,
    Paused: 2,
    Stopped: 3
  };
  if (mpris.players.length === 0) {
    return mpris.players[0];
  }
  const isPlaying = mpris.players.some((p) => p["play-back-status"] === "Playing");
  const playerStillExists = mpris.players.some((p) => activePlayer["bus-name"] === p["bus-name"]);
  const nextPlayerUp = mpris.players.sort((a, b) => statusOrder[a["play-back-status"]] - statusOrder[b["play-back-status"]])[0];
  if (isPlaying || !playerStillExists) {
    return nextPlayerUp;
  }
  return activePlayer;
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/bar/media/index.ts
var mpris2 = await Service.import("mpris");
var { show_artist, truncation, truncation_size, show_label } = options_default.bar.media;
var Media = () => {
  const activePlayer = Variable(mpris2.players[0]);
  mpris2.connect("changed", () => {
    const curPlayer = getCurrentPlayer(activePlayer.value);
    activePlayer.value = curPlayer;
  });
  const getIconForPlayer = (playerName) => {
    const windowTitleMap = [
      ["Firefox", "\uDB80\uDE39 "],
      ["Microsoft Edge", "\uDB80\uDDE9 "],
      ["Discord", "\uF1FF "],
      ["Plex", "\uDB81\uDEBA "],
      ["Spotify", "\uDB81\uDCC7 "],
      ["(.*)", "\uDB81\uDF5A "]
    ];
    const foundMatch = windowTitleMap.find((wt) => RegExp(wt[0], "i").test(playerName));
    return foundMatch ? foundMatch[1] : "\uDB81\uDF5A";
  };
  const songIcon = Variable("");
  const mediaLabel = Utils.watch("Media", [mpris2, show_artist, truncation, truncation_size, show_label], () => {
    if (activePlayer.value && show_label.value) {
      const { track_title, identity, track_artists } = activePlayer.value;
      songIcon.value = getIconForPlayer(identity);
      const trackArtist = show_artist.value ? ` - ${track_artists.join(", ")}` : ``;
      const truncatedLabel = truncation.value ? `${track_title + trackArtist}`.substring(0, truncation_size.value) : `${track_title + trackArtist}`;
      return track_title.length === 0 ? `No media playing...` : truncatedLabel.length < truncation_size.value || !truncation.value ? `${truncatedLabel}` : `${truncatedLabel.substring(0, truncatedLabel.length - 3)}...`;
    } else {
      songIcon.value = getIconForPlayer(activePlayer.value?.identity || "");
      return `Media`;
    }
  });
  return {
    component: Widget.Box({
      visible: false,
      child: Widget.Box({
        class_name: "media",
        child: Widget.Box({
          children: [
            Widget.Label({
              class_name: "bar-button-icon media txt-icon bar",
              label: songIcon.bind("value").as((v) => v || "\uDB81\uDF5A")
            }),
            Widget.Label({
              class_name: "bar-button-label media",
              label: mediaLabel
            })
          ]
        })
      })
    }),
    isVisible: false,
    boxClass: "media",
    name: "media",
    props: {
      on_scroll_up: () => activePlayer.value?.next(),
      on_scroll_down: () => activePlayer.value?.previous(),
      on_primary_click: (clicked, event) => {
        openMenu(clicked, event, "mediamenu");
      }
    }
  };
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/bar/notifications/index.ts
var { show_total } = options_default.bar.notifications;
var notifs = await Service.import("notifications");
var Notifications = () => {
  return {
    component: Widget.Box({
      hpack: "start",
      child: Widget.Box({
        hpack: "start",
        class_name: "bar-notifications",
        children: Utils.merge([notifs.bind("notifications"), notifs.bind("dnd"), show_total.bind("value")], (notif, dnd, showTotal) => {
          const notifIcon = Widget.Label({
            hpack: "center",
            class_name: "bar-button-icon notifications txt-icon bar",
            label: dnd ? "\uDB80\uDC9B" : notif.length > 0 ? "\uDB84\uDD6B" : "\uDB80\uDC9A"
          });
          const notifLabel = Widget.Label({
            hpack: "center",
            class_name: "bar-button-label notifications",
            label: notif.length.toString()
          });
          if (showTotal) {
            return [notifIcon, notifLabel];
          }
          return [notifIcon];
        })
      })
    }),
    isVisible: true,
    boxClass: "notifications",
    props: {
      on_primary_click: (clicked, event) => {
        openMenu(clicked, event, "notificationsmenu");
      }
    }
  };
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/bar/volume/index.ts
var audio = await Service.import("audio");
var Volume = () => {
  const icons5 = {
    101: "\uDB81\uDD7E",
    66: "\uDB81\uDD7E",
    34: "\uDB81\uDD80",
    1: "\uDB81\uDD7F",
    0: "\uDB81\uDF5F"
  };
  const getIcon = () => {
    const icon = Utils.merge([audio.speaker.bind("is_muted"), audio.speaker.bind("volume")], (isMuted, vol) => {
      return isMuted ? 0 : [101, 66, 34, 1, 0].find((threshold) => threshold <= vol * 100);
    });
    return icon.as((i) => i !== undefined ? icons5[i] : 101);
  };
  const volIcn = Widget.Label({
    vpack: "center",
    label: getIcon(),
    class_name: "bar-button-icon volume txt-icon bar"
  });
  const volPct = Widget.Label({
    vpack: "center",
    label: audio.speaker.bind("volume").as((v) => `${Math.round(v * 100)}%`),
    class_name: "bar-button-label volume"
  });
  return {
    component: Widget.Box({
      vpack: "center",
      class_name: "volume",
      children: options_default.bar.volume.label.bind("value").as((showLabel) => {
        if (showLabel) {
          return [volIcn, volPct];
        }
        return [volIcn];
      })
    }),
    isVisible: true,
    boxClass: "volume",
    props: {
      on_primary_click: (clicked, event) => {
        openMenu(clicked, event, "audiomenu");
      }
    }
  };
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/bar/network/index.ts
var network = await Service.import("network");
var { label: networkLabel, truncation: truncation2, truncation_size: truncation_size2 } = options_default.bar.network;
var Network = () => {
  return {
    component: Widget.Box({
      vpack: "center",
      class_name: "bar-network",
      children: [
        Widget.Icon({
          class_name: "bar-button-icon network",
          icon: Utils.merge([
            network.bind("primary"),
            network.bind("wifi"),
            network.bind("wired")
          ], (pmry, wfi, wrd) => {
            if (pmry === "wired") {
              return wrd.icon_name;
            }
            return wfi.icon_name;
          })
        }),
        Widget.Box({
          class_name: "bar-button-icon network",
          child: Utils.merge([
            network.bind("primary"),
            network.bind("wifi"),
            networkLabel.bind("value"),
            truncation2.bind("value"),
            truncation_size2.bind("value")
          ], (pmry, wfi, showLbl, trunc, tSize) => {
            if (!showLbl) {
              return Widget.Box();
            }
            if (pmry === "wired") {
              return Widget.Label({
                class_name: "bar-button-label network",
                label: "Wired".substring(0, tSize)
              });
            }
            return Widget.Label({
              class_name: "bar-button-label network",
              label: wfi.ssid ? `${trunc ? wfi.ssid.substring(0, tSize) : wfi.ssid}` : "--"
            });
          })
        })
      ]
    }),
    isVisible: true,
    boxClass: "network",
    props: {
      on_primary_click: (clicked, event) => {
        openMenu(clicked, event, "networkmenu");
      }
    }
  };
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/bar/bluetooth/index.ts
var bluetooth = await Service.import("bluetooth");
var Bluetooth = () => {
  const btIcon = Widget.Label({
    label: bluetooth.bind("enabled").as((v) => v ? "\uDB80\uDCAF" : "\uDB80\uDCB2"),
    class_name: "bar-button-icon bluetooth txt-icon bar"
  });
  const btText = Widget.Label({
    label: Utils.merge([
      bluetooth.bind("enabled"),
      bluetooth.bind("connected_devices")
    ], (btEnabled, btDevices) => {
      return btEnabled && btDevices.length ? ` Connected (${btDevices.length})` : btEnabled ? "On" : "Off";
    }),
    class_name: "bar-button-label bluetooth"
  });
  return {
    component: Widget.Box({
      class_name: "volume",
      children: options_default.bar.bluetooth.label.bind("value").as((showLabel) => {
        if (showLabel) {
          return [btIcon, btText];
        }
        return [btIcon];
      })
    }),
    isVisible: true,
    boxClass: "bluetooth",
    props: {
      on_primary_click: (clicked, event) => {
        openMenu(clicked, event, "bluetoothmenu");
      }
    }
  };
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/bar/battery/index.ts
var battery = await Service.import("battery");
var { label: show_label2 } = options_default.bar.battery;
var BatteryLabel = () => {
  const isVis = Variable(battery.available);
  const batIcon = Utils.merge([battery.bind("percent"), battery.bind("charging"), battery.bind("charged")], (batPercent, batCharging, batCharged) => {
    if (batCharged)
      return `battery-level-100-charged-symbolic`;
    else
      return `battery-level-${Math.floor(batPercent / 10) * 10}${batCharging ? "-charging" : ""}-symbolic`;
  });
  battery.connect("changed", ({ available }) => {
    isVis.value = available;
  });
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    return { hours, minutes };
  };
  const generateTooltip = (timeSeconds, isCharging, isCharged) => {
    if (isCharged) {
      return "Fully Charged!!!";
    }
    const { hours, minutes } = formatTime(timeSeconds);
    if (isCharging) {
      return `${hours} hours ${minutes} minutes until full`;
    } else {
      return `${hours} hours ${minutes} minutes left`;
    }
  };
  return {
    component: Widget.Box({
      class_name: "battery",
      visible: battery.bind("available"),
      tooltip_text: battery.bind("time_remaining").as((t) => t.toString()),
      children: Utils.merge([battery.bind("available"), show_label2.bind("value")], (batAvail, showLabel) => {
        if (batAvail && showLabel) {
          return [
            Widget.Icon({
              class_name: "bar-button-icon battery",
              icon: batIcon
            }),
            Widget.Label({
              class_name: "bar-button-label battery",
              label: battery.bind("percent").as((p) => `${Math.floor(p)}%`)
            })
          ];
        } else if (batAvail && !showLabel) {
          return [Widget.Icon({ icon: batIcon })];
        } else {
          return [];
        }
      }),
      setup: (self) => {
        self.hook(battery, () => {
          if (battery.available) {
            self.tooltip_text = generateTooltip(battery.time_remaining, battery.charging, battery.charged);
          }
        });
      }
    }),
    isVis,
    boxClass: "battery",
    props: {
      on_primary_click: (clicked, event) => {
        openMenu(clicked, event, "energymenu");
      }
    }
  };
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/bar/clock/index.ts
import GLib4 from "gi://GLib";
var { format } = options_default.bar.clock;
var date = Variable(GLib4.DateTime.new_now_local(), {
  poll: [1000, () => GLib4.DateTime.new_now_local()]
});
var time = Utils.derive([date, format], (c, f) => c.format(f) || "");
var Clock = () => {
  return {
    component: Widget.Label({
      class_name: "clock",
      label: time.bind()
    }),
    isVisible: true,
    boxClass: "clock",
    props: {
      on_primary_click: (clicked, event) => {
        openMenu(clicked, event, "calendarmenu");
      }
    }
  };
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/bar/systray/index.ts
var systemtray = await Service.import("systemtray");
var { ignore } = options_default.bar.systray;
var SysTray = () => {
  const isVis = Variable(false);
  const items = Utils.merge([systemtray.bind("items"), ignore.bind("value")], (items2, ignored) => {
    const filteredTray = items2.filter(({ id }) => !ignored.includes(id));
    isVis.value = filteredTray.length > 0;
    return filteredTray.map((item) => {
      if (item.menu !== undefined) {
        item.menu["class_name"] = "systray-menu";
      }
      return Widget.Button({
        cursor: "pointer",
        child: Widget.Icon({
          class_name: "systray-icon",
          icon: item.bind("icon")
        }),
        on_primary_click: (_, event) => item.activate(event),
        on_secondary_click: (_, event) => item.openMenu(event),
        tooltip_markup: item.bind("tooltip_markup")
      });
    });
  });
  return {
    component: Widget.Box({
      class_name: "systray",
      children: items
    }),
    isVisible: true,
    boxClass: "systray",
    isVis
  };
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/shared/barItemBox.ts
var BarItemBox = (child) => {
  const computeVisible = () => {
    if (Object.hasOwnProperty.call(child, "isVis")) {
      return child.isVis.bind("value");
    }
    return child.isVisible;
  };
  return Widget.Button({
    class_name: `bar_item_box_visible ${Object.hasOwnProperty.call(child, "boxClass") ? child.boxClass : ""}`,
    child: child.component,
    visible: computeVisible(),
    ...child.props
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/bar/Bar.ts
import Gdk3 from "gi://Gdk?version=3.0";
function getGdkMonitors() {
  const display = Gdk3.Display.get_default();
  if (display === null) {
    console.error("Failed to get Gdk display.");
    return {};
  }
  const numGdkMonitors = display.get_n_monitors();
  const gdkMonitors = {};
  for (let i = 0;i < numGdkMonitors; i++) {
    const curMonitor = display.get_monitor(i);
    if (curMonitor === null) {
      console.warn(`Monitor at index ${i} is null.`);
      continue;
    }
    const model = curMonitor.get_model();
    const geometry = curMonitor.get_geometry();
    const scaleFactor = curMonitor.get_scale_factor();
    const key = `${model}_${geometry.width}x${geometry.height}_${scaleFactor}`;
    gdkMonitors[i] = { key, model, used: false };
  }
  return gdkMonitors;
}
var hyprland4 = await Service.import("hyprland");
var { layouts } = options_default.bar;
var getModulesForMonitor = (monitor, curLayouts) => {
  const foundMonitor = Object.keys(curLayouts).find((mon) => mon === monitor.toString());
  const defaultSetup = {
    left: [
      "dashboard",
      "workspaces",
      "windowtitle"
    ],
    middle: [
      "media"
    ],
    right: [
      "volume",
      "network",
      "bluetooth",
      "battery",
      "systray",
      "clock",
      "notifications"
    ]
  };
  if (foundMonitor === undefined) {
    return defaultSetup;
  }
  return curLayouts[foundMonitor];
};
var widget = {
  battery: () => BarItemBox(BatteryLabel()),
  dashboard: () => BarItemBox(Menu()),
  workspaces: (monitor) => BarItemBox(Workspaces(monitor, 10)),
  windowtitle: () => BarItemBox(ClientTitle()),
  media: () => BarItemBox(Media()),
  notifications: () => BarItemBox(Notifications()),
  volume: () => BarItemBox(Volume()),
  network: () => BarItemBox(Network()),
  bluetooth: () => BarItemBox(Bluetooth()),
  clock: () => BarItemBox(Clock()),
  systray: () => BarItemBox(SysTray())
};
var gdkMonitorIdToHyprlandId = (monitor, usedHyprlandMonitors) => {
  const gdkMonitors = getGdkMonitors();
  if (Object.keys(gdkMonitors).length === 0) {
    console.error("No GDK monitors were found.");
    return monitor;
  }
  const gdkMonitor = gdkMonitors[monitor];
  const directMatch = hyprland4.monitors.find((hypMon) => {
    const hyprlandKey = `${hypMon.model}_${hypMon.width}x${hypMon.height}_${hypMon.scale}`;
    return gdkMonitor.key.startsWith(hyprlandKey) && !usedHyprlandMonitors.has(hypMon.id) && hypMon.id === monitor;
  });
  if (directMatch) {
    usedHyprlandMonitors.add(directMatch.id);
    return directMatch.id;
  }
  const hyprlandMonitor = hyprland4.monitors.find((hypMon) => {
    const hyprlandKey = `${hypMon.model}_${hypMon.width}x${hypMon.height}_${hypMon.scale}`;
    return gdkMonitor.key.startsWith(hyprlandKey) && !usedHyprlandMonitors.has(hypMon.id);
  });
  if (hyprlandMonitor) {
    usedHyprlandMonitors.add(hyprlandMonitor.id);
    return hyprlandMonitor.id;
  }
  const fallbackMonitor = hyprland4.monitors.find((hypMon) => !usedHyprlandMonitors.has(hypMon.id));
  if (fallbackMonitor) {
    usedHyprlandMonitors.add(fallbackMonitor.id);
    return fallbackMonitor.id;
  }
  for (let i = 0;i < hyprland4.monitors.length; i++) {
    if (!usedHyprlandMonitors.has(i)) {
      usedHyprlandMonitors.add(i);
      return i;
    }
  }
  console.warn(`Returning original monitor index as a last resort: ${monitor}`);
  return monitor;
};
var Bar = (() => {
  const usedHyprlandMonitors = new Set;
  return (monitor) => {
    const hyprlandMonitor = gdkMonitorIdToHyprlandId(monitor, usedHyprlandMonitors);
    return Widget.Window({
      name: `bar-${hyprlandMonitor}`,
      class_name: "bar",
      monitor,
      visible: true,
      anchor: ["top", "left", "right"],
      exclusivity: "exclusive",
      layer: options_default.theme.bar.layer.bind("value"),
      child: Widget.Box({
        class_name: "bar-panel-container",
        child: Widget.CenterBox({
          class_name: "bar-panel",
          css: "padding: 1px 0px 0px 0px",
          startWidget: Widget.Box({
            class_name: "box-left",
            hexpand: true,
            setup: (self) => {
              self.hook(layouts, (self2) => {
                const foundLayout = getModulesForMonitor(hyprlandMonitor, layouts.value);
                self2.children = foundLayout.left.filter((mod) => Object.keys(widget).includes(mod)).map((w) => widget[w](hyprlandMonitor));
              });
            }
          }),
          centerWidget: Widget.Box({
            class_name: "box-center",
            hpack: "center",
            setup: (self) => {
              self.hook(layouts, (self2) => {
                const foundLayout = getModulesForMonitor(hyprlandMonitor, layouts.value);
                self2.children = foundLayout.middle.filter((mod) => Object.keys(widget).includes(mod)).map((w) => widget[w](hyprlandMonitor));
              });
            }
          }),
          endWidget: Widget.Box({
            class_name: "box-right",
            hpack: "end",
            setup: (self) => {
              self.hook(layouts, (self2) => {
                const foundLayout = getModulesForMonitor(hyprlandMonitor, layouts.value);
                self2.children = foundLayout.right.filter((mod) => Object.keys(widget).includes(mod)).map((w) => widget[w](hyprlandMonitor));
              });
            }
          })
        })
      })
    });
  };
})();

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/PopupWindow.ts
var Padding = (name, opts) => Widget.EventBox({
  class_name: opts?.className || "",
  hexpand: true,
  vexpand: typeof opts?.vexpand === "boolean" ? opts.vexpand : true,
  can_focus: false,
  child: Widget.Box(),
  setup: (w) => w.on("button-press-event", () => App.toggleWindow(name))
});
var PopupRevealer = (name, child, transition = "slide_down") => Widget.Box({ css: "padding: 1px;" }, Widget.Revealer({
  transition,
  child: Widget.Box({
    class_name: `window-content ${name}-window`,
    child
  }),
  transitionDuration: 200,
  setup: (self) => self.hook(App, (_, wname, visible) => {
    if (wname === name)
      self.reveal_child = visible;
  })
}));
var Layout = (name, child, transition) => ({
  center: () => Widget.CenterBox({}, Padding(name, {}), Widget.CenterBox({ vertical: true }, Padding(name, {}), PopupRevealer(name, child, transition), Padding(name, {})), Padding(name, {})),
  top: () => Widget.CenterBox({}, Padding(name, {}), Widget.Box({ vertical: true }, PopupRevealer(name, child, transition), Padding(name, {})), Padding(name, {})),
  "top-right": () => Widget.Box({}, Padding(name, {}), Widget.Box({
    hexpand: false,
    vertical: true
  }, Padding(name, {
    vexpand: false,
    className: "event-top-padding"
  }), PopupRevealer(name, child, transition), Padding(name, {}))),
  "top-center": () => Widget.Box({}, Padding(name, {}), Widget.Box({
    hexpand: false,
    vertical: true
  }, Padding(name, {
    vexpand: false,
    className: "event-top-padding"
  }), PopupRevealer(name, child, transition), Padding(name, {})), Padding(name, {})),
  "top-left": () => Widget.Box({}, Widget.Box({
    hexpand: false,
    vertical: true
  }, Padding(name, {
    vexpand: false,
    className: "event-top-padding"
  }), PopupRevealer(name, child, transition), Padding(name, {})), Padding(name, {})),
  "bottom-left": () => Widget.Box({}, Widget.Box({
    hexpand: false,
    vertical: true
  }, Padding(name, {}), PopupRevealer(name, child, transition)), Padding(name, {})),
  "bottom-center": () => Widget.Box({}, Padding(name, {}), Widget.Box({
    hexpand: false,
    vertical: true
  }, Padding(name, {}), PopupRevealer(name, child, transition)), Padding(name, {})),
  "bottom-right": () => Widget.Box({}, Padding(name, {}), Widget.Box({
    hexpand: false,
    vertical: true
  }, Padding(name, {}), PopupRevealer(name, child, transition)))
});
var PopupWindow_default = ({
  name,
  child,
  layout = "center",
  transition,
  exclusivity = "ignore",
  ...props
}) => Widget.Window({
  name,
  class_names: [name, "popup-window"],
  setup: (w) => w.keybind("Escape", () => App.closeWindow(name)),
  visible: false,
  keymode: "on-demand",
  exclusivity,
  layer: "top",
  anchor: ["top", "bottom", "right", "left"],
  child: Layout(name, child, transition)[layout](),
  ...props
});

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/power/helpers/actions.ts
var { sleep, reboot, logout, shutdown } = options_default.menus.dashboard.powermenu;

class PowerMenu extends Service {
  static {
    Service.register(this, {}, {
      title: ["string"],
      cmd: ["string"]
    });
  }
  #title = "";
  #cmd = "";
  get title() {
    return this.#title;
  }
  action(action) {
    [this.#cmd, this.#title] = {
      sleep: [sleep.value, "Sleep"],
      reboot: [reboot.value, "Reboot"],
      logout: [logout.value, "Log Out"],
      shutdown: [shutdown.value, "Shutdown"]
    }[action];
    this.notify("cmd");
    this.notify("title");
    this.emit("changed");
    App.closeWindow("powermenu");
    App.openWindow("verification");
  }
  shutdown = () => {
    this.action("shutdown");
  };
  exec = () => {
    App.closeWindow("verification");
    Utils.execAsync(this.#cmd);
  };
}
var powermenu = new PowerMenu;
Object.assign(globalThis, { powermenu });
var actions_default = powermenu;

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/icons/index.ts
var icons_default2 = {
  missing: "image-missing-symbolic",
  nix: {
    nix: "nix-snowflake-symbolic"
  },
  app: {
    terminal: "terminal-symbolic"
  },
  fallback: {
    executable: "application-x-executable",
    notification: "dialog-information-symbolic",
    video: "video-x-generic-symbolic",
    audio: "audio-x-generic-symbolic"
  },
  ui: {
    close: "window-close-symbolic",
    colorpicker: "color-select-symbolic",
    info: "info-symbolic",
    link: "external-link-symbolic",
    lock: "system-lock-screen-symbolic",
    menu: "open-menu-symbolic",
    refresh: "view-refresh-symbolic",
    search: "system-search-symbolic",
    settings: "emblem-system-symbolic",
    themes: "preferences-desktop-theme-symbolic",
    tick: "object-select-symbolic",
    time: "hourglass-symbolic",
    toolbars: "toolbars-symbolic",
    warning: "dialog-warning-symbolic",
    avatar: "avatar-default-symbolic",
    arrow: {
      right: "pan-end-symbolic",
      left: "pan-start-symbolic",
      down: "pan-down-symbolic",
      up: "pan-up-symbolic"
    }
  },
  audio: {
    mic: {
      muted: "microphone-disabled-symbolic",
      low: "microphone-sensitivity-low-symbolic",
      medium: "microphone-sensitivity-medium-symbolic",
      high: "microphone-sensitivity-high-symbolic"
    },
    volume: {
      muted: "audio-volume-muted-symbolic",
      low: "audio-volume-low-symbolic",
      medium: "audio-volume-medium-symbolic",
      high: "audio-volume-high-symbolic",
      overamplified: "audio-volume-overamplified-symbolic"
    },
    type: {
      headset: "audio-headphones-symbolic",
      speaker: "audio-speakers-symbolic",
      card: "audio-card-symbolic"
    },
    mixer: "mixer-symbolic"
  },
  powerprofile: {
    balanced: "power-profile-balanced-symbolic",
    "power-saver": "power-profile-power-saver-symbolic",
    performance: "power-profile-performance-symbolic"
  },
  asusctl: {
    profile: {
      Balanced: "power-profile-balanced-symbolic",
      Quiet: "power-profile-power-saver-symbolic",
      Performance: "power-profile-performance-symbolic"
    },
    mode: {
      Integrated: "processor-symbolic",
      Hybrid: "controller-symbolic"
    }
  },
  battery: {
    charging: "battery-flash-symbolic",
    warning: "battery-empty-symbolic"
  },
  bluetooth: {
    enabled: "bluetooth-active-symbolic",
    disabled: "bluetooth-disabled-symbolic"
  },
  brightness: {
    indicator: "display-brightness-symbolic",
    keyboard: "keyboard-brightness-symbolic",
    screen: "display-brightness-symbolic"
  },
  powermenu: {
    sleep: "weather-clear-night-symbolic",
    reboot: "system-reboot-symbolic",
    logout: "system-log-out-symbolic",
    shutdown: "system-shutdown-symbolic"
  },
  recorder: {
    recording: "media-record-symbolic"
  },
  notifications: {
    noisy: "org.gnome.Settings-notifications-symbolic",
    silent: "notifications-disabled-symbolic",
    message: "chat-bubbles-symbolic"
  },
  trash: {
    full: "user-trash-full-symbolic",
    empty: "user-trash-symbolic"
  },
  mpris: {
    shuffle: {
      enabled: "media-playlist-shuffle-symbolic",
      disabled: "media-playlist-consecutive-symbolic"
    },
    loop: {
      none: "media-playlist-repeat-symbolic",
      track: "media-playlist-repeat-song-symbolic",
      playlist: "media-playlist-repeat-symbolic"
    },
    playing: "media-playback-pause-symbolic",
    paused: "media-playback-start-symbolic",
    stopped: "media-playback-start-symbolic",
    prev: "media-skip-backward-symbolic",
    next: "media-skip-forward-symbolic"
  },
  system: {
    cpu: "org.gnome.SystemMonitor-symbolic",
    ram: "drive-harddisk-solidstate-symbolic",
    temp: "temperature-symbolic"
  },
  color: {
    dark: "dark-mode-symbolic",
    light: "light-mode-symbolic"
  },
  weather: {
    warning: "dialog-warning-symbolic",
    sunny: "weather-clear-symbolic",
    clear: "weather-clear-night-symbolic",
    partly_cloudy: "weather-few-clouds-symbolic",
    partly_cloudy_night: "weather-few-clouds-night-symbolic",
    cloudy: "weather-overcast-symbolic",
    overcast: "weather-overcast-symbolic",
    mist: "weather-overcast-symbolic",
    patchy_rain_nearby: "weather-showers-scattered-symbolic",
    patchy_rain_possible: "weather-showers-scattered-symbolic",
    patchy_snow_possible: "weather-snow-symbolic",
    patchy_sleet_possible: "weather-snow-symbolic",
    patchy_freezing_drizzle_possible: "weather-showers-scattered-symbolic",
    thundery_outbreaks_possible: "weather-overcast-symbolic",
    blowing_snow: "weather-snow-symbolic",
    blizzard: "weather-snow-symbolic",
    fog: "weather-fog-symbolic",
    freezing_fog: "weather-fog-symbolic",
    patchy_light_drizzle: "weather-showers-scattered-symbolic",
    light_drizzle: "weather-showers-symbolic",
    freezing_drizzle: "weather-showers-symbolic",
    heavy_freezing_drizzle: "weather-showers-symbolic",
    patchy_light_rain: "weather-showers-scattered-symbolic",
    light_rain: "weather-showers-symbolic",
    moderate_rain_at_times: "weather-showers-symbolic",
    moderate_rain: "weather-showers-symbolic",
    heavy_rain_at_times: "weather-showers-symbolic",
    heavy_rain: "weather-showers-symbolic",
    light_freezing_rain: "weather-showers-symbolic",
    moderate_or_heavy_freezing_rain: "weather-showers-symbolic",
    light_sleet: "weather-snow-symbolic",
    moderate_or_heavy_sleet: "weather-snow-symbolic",
    patchy_light_snow: "weather-snow-symbolic",
    light_snow: "weather-snow-symbolic",
    patchy_moderate_snow: "weather-snow-symbolic",
    moderate_snow: "weather-snow-symbolic",
    patchy_heavy_snow: "weather-snow-symbolic",
    heavy_snow: "weather-snow-symbolic",
    ice_pellets: "weather-showers-symbolic",
    light_rain_shower: "weather-showers-symbolic",
    moderate_or_heavy_rain_shower: "weather-showers-symbolic",
    torrential_rain_shower: "weather-showers-symbolic",
    light_sleet_showers: "weather-showers-symbolic",
    moderate_or_heavy_sleet_showers: "weather-showers-symbolic",
    light_snow_showers: "weather-snow-symbolic",
    moderate_or_heavy_snow_showers: "weather-snow-symbolic",
    light_showers_of_ice_pellets: "weather-showers-symbolic",
    moderate_or_heavy_showers_of_ice_pellets: "weather-showers-symbolic",
    patchy_light_rain_with_thunder: "weather-showers-scattered-symbolic",
    moderate_or_heavy_rain_with_thunder: "weather-showers-symbolic",
    patchy_light_snow_with_thunder: "weather-snow-symbolic",
    moderate_or_heavy_snow_with_thunder: "weather-snow-symbolic"
  }
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/power/index.ts
var SysButton = (action, label) => Widget.Button({
  class_name: `widget-button powermenu-button-${action}`,
  on_clicked: () => actions_default.action(action),
  child: Widget.Box({
    vertical: true,
    class_name: "system-button widget-box",
    children: [
      Widget.Icon({
        class_name: `system-button_icon ${action}`,
        icon: icons_default2.powermenu[action]
      }),
      Widget.Label({
        class_name: `system-button_label ${action}`,
        label
      })
    ]
  })
});
var power_default = () => PopupWindow_default({
  name: "powermenu",
  transition: "crossfade",
  child: Widget.Box({
    class_name: "powermenu horizontal",
    children: [
      SysButton("shutdown", "SHUTDOWN"),
      SysButton("logout", "LOG OUT"),
      SysButton("reboot", "REBOOT"),
      SysButton("sleep", "SLEEP")
    ]
  })
});

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/power/verification.ts
var verification_default = () => PopupWindow_default({
  name: "verification",
  transition: "crossfade",
  child: Widget.Box({
    class_name: "verification",
    child: Widget.Box({
      class_name: "verification-content",
      expand: true,
      vertical: true,
      children: [
        Widget.Box({
          class_name: "text-box",
          vertical: true,
          children: [
            Widget.Label({
              class_name: "title",
              label: actions_default.bind("title").as((t) => t.toUpperCase())
            }),
            Widget.Label({
              class_name: "desc",
              label: actions_default.bind("title").as((p) => `Are you sure you want to ${p.toLowerCase()}?`)
            })
          ]
        }),
        Widget.Box({
          class_name: "buttons horizontal",
          vexpand: true,
          vpack: "end",
          homogeneous: true,
          children: [
            Widget.Button({
              class_name: "verification-button bar-verification_yes",
              child: Widget.Label("Yes"),
              on_clicked: actions_default.exec
            }),
            Widget.Button({
              class_name: "verification-button bar-verification_no",
              child: Widget.Label("No"),
              on_clicked: () => App.toggleWindow("verification")
            })
          ]
        })
      ]
    })
  })
});

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/DropdownMenu.ts
var hyprland5 = await Service.import("hyprland");
var moveBoxToCursor = (self, fixed) => {
  if (fixed) {
    return;
  }
  globalMousePos.connect("changed", async ({ value }) => {
    const curHyprlandMonitor = hyprland5.monitors.find((m) => m.id === hyprland5.active.monitor.id);
    const dropdownWidth = self.child.get_allocation().width;
    let hyprScaling = 1;
    try {
      const monitorInfo = await bash("hyprctl monitors -j");
      const parsedMonitorInfo = JSON.parse(monitorInfo);
      const foundMonitor = parsedMonitorInfo.find((monitor) => monitor.id === hyprland5.active.monitor.id);
      hyprScaling = foundMonitor?.scale || 1;
    } catch (error) {
      console.error(`Error parsing hyprland monitors: ${error}`);
    }
    let monWidth = curHyprlandMonitor?.width;
    let monHeight = curHyprlandMonitor?.height;
    if (monWidth === undefined || monHeight === undefined || hyprScaling === undefined) {
      return;
    }
    const gdkScale = Utils.exec('bash -c "echo $GDK_SCALE"');
    if (/^\d+(.\d+)?$/.test(gdkScale)) {
      const scale = parseFloat(gdkScale);
      monWidth = monWidth / scale;
      monHeight = monHeight / scale;
    } else {
      monWidth = monWidth / hyprScaling;
      monHeight = monHeight / hyprScaling;
    }
    const isVertical = curHyprlandMonitor?.transform !== undefined ? curHyprlandMonitor.transform % 2 !== 0 : false;
    if (isVertical) {
      [monWidth, monHeight] = [monHeight, monWidth];
    }
    let marginRight = monWidth - dropdownWidth / 2;
    marginRight = fixed ? marginRight - monWidth / 2 : marginRight - value[0];
    let marginLeft = monWidth - dropdownWidth - marginRight;
    const minimumMargin = 0;
    if (marginRight < minimumMargin) {
      marginRight = minimumMargin;
      marginLeft = monWidth - dropdownWidth - minimumMargin;
    }
    if (marginLeft < minimumMargin) {
      marginLeft = minimumMargin;
      marginRight = monWidth - dropdownWidth - minimumMargin;
    }
    const marginTop = 45;
    const marginBottom = monHeight - marginTop;
    self.set_margin_left(marginLeft);
    self.set_margin_right(marginRight);
    self.set_margin_bottom(marginBottom);
  });
};
var initRender = Variable(true);
setTimeout(() => {
  initRender.value = false;
}, 2000);
var DropdownMenu_default = ({
  name,
  child,
  layout = "center",
  transition,
  exclusivity = "ignore",
  fixed = false,
  ...props
}) => Widget.Window({
  name,
  class_names: [name, "dropdown-menu"],
  setup: (w) => w.keybind("Escape", () => App.closeWindow(name)),
  visible: initRender.bind("value"),
  keymode: "on-demand",
  exclusivity,
  layer: "top",
  anchor: ["top", "left"],
  child: Widget.EventBox({
    class_name: "parent-event",
    on_primary_click: () => App.closeWindow(name),
    on_secondary_click: () => App.closeWindow(name),
    child: Widget.Box({
      class_name: "top-eb",
      vertical: true,
      children: [
        Widget.EventBox({
          class_name: "mid-eb event-top-padding",
          hexpand: true,
          vexpand: false,
          can_focus: false,
          child: Widget.Box(),
          setup: (w) => {
            w.on("button-press-event", () => App.toggleWindow(name));
            w.set_margin_top(1);
          }
        }),
        Widget.EventBox({
          class_name: "in-eb menu-event-box",
          on_primary_click: () => {
            return true;
          },
          on_secondary_click: () => {
            return true;
          },
          setup: (self) => {
            moveBoxToCursor(self, fixed);
          },
          child: Widget.Box({
            class_name: "dropdown-menu-container",
            css: "padding: 1px; margin: -1px;",
            child: Widget.Revealer({
              revealChild: false,
              setup: (self) => self.hook(App, (_, wname, visible) => {
                if (wname === name)
                  self.reveal_child = visible;
              }),
              transition: "crossfade",
              transitionDuration: 350,
              child: Widget.Box({
                class_name: "dropdown-menu-container",
                can_focus: true,
                children: [child]
              })
            })
          })
        })
      ]
    })
  }),
  ...props
});

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/audio/utils.ts
var getIcon = (audioVol, isMuted) => {
  const speakerIcons = {
    101: "audio-volume-overamplified-symbolic",
    66: "audio-volume-high-symbolic",
    34: "audio-volume-medium-symbolic",
    1: "audio-volume-low-symbolic",
    0: "audio-volume-muted-symbolic"
  };
  const inputIcons = {
    66: "microphone-sensitivity-high-symbolic",
    34: "microphone-sensitivity-medium-symbolic",
    1: "microphone-sensitivity-low-symbolic",
    0: "microphone-disabled-symbolic"
  };
  const icon = isMuted ? 0 : [101, 66, 34, 1, 0].find((threshold) => threshold <= audioVol * 100);
  return {
    spkr: speakerIcons[icon],
    mic: inputIcons[icon]
  };
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/audio/active/SelectedInput.ts
var audio2 = await Service.import("audio");
var renderActiveInput = () => {
  return [
    Widget.Box({
      class_name: "menu-slider-container input",
      children: [
        Widget.Button({
          vexpand: false,
          vpack: "end",
          setup: (self) => {
            self.hook(audio2, () => {
              const mic = audio2.microphone;
              const className = `menu-active-button input ${mic.is_muted ? "muted" : ""}`;
              return self.class_name = className;
            });
          },
          on_primary_click: () => audio2.microphone.is_muted = !audio2.microphone.is_muted,
          child: Widget.Icon({
            class_name: "menu-active-icon input",
            setup: (self) => {
              self.hook(audio2, () => {
                self.icon = getIcon(audio2.microphone.volume, audio2.microphone.is_muted)["mic"];
              });
            }
          })
        }),
        Widget.Box({
          vertical: true,
          children: [
            Widget.Label({
              class_name: "menu-active input",
              hpack: "start",
              truncate: "end",
              wrap: true,
              label: audio2.bind("microphone").as((v) => v.description === null ? "No input device found..." : v.description)
            }),
            Widget.Slider({
              value: audio2.microphone.bind("volume").as((v) => v),
              class_name: "menu-active-slider menu-slider inputs",
              draw_value: false,
              hexpand: true,
              min: 0,
              max: 1,
              onChange: ({ value }) => audio2.microphone.volume = value
            })
          ]
        }),
        Widget.Label({
          class_name: "menu-active-percentage input",
          vpack: "end",
          label: audio2.microphone.bind("volume").as((v) => `${Math.round(v * 100)}%`)
        })
      ]
    })
  ];
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/audio/active/SelectedPlayback.ts
var audio3 = await Service.import("audio");
var renderActivePlayback = () => {
  return [
    Widget.Box({
      class_name: "menu-slider-container playback",
      children: [
        Widget.Button({
          vexpand: false,
          vpack: "end",
          setup: (self) => {
            self.hook(audio3, () => {
              const spkr = audio3.speaker;
              const className = `menu-active-button playback ${spkr.is_muted ? "muted" : ""}`;
              return self.class_name = className;
            });
          },
          on_primary_click: () => audio3.speaker.is_muted = !audio3.speaker.is_muted,
          child: Widget.Icon({
            class_name: "menu-active-icon playback",
            setup: (self) => {
              self.hook(audio3, () => {
                self.icon = getIcon(audio3.speaker.volume, audio3.speaker.is_muted)["spkr"];
              });
            }
          })
        }),
        Widget.Box({
          vertical: true,
          children: [
            Widget.Label({
              class_name: "menu-active playback",
              hpack: "start",
              truncate: "end",
              expand: true,
              wrap: true,
              label: audio3.bind("speaker").as((v) => v.description || "")
            }),
            Widget.Slider({
              value: audio3["speaker"].bind("volume"),
              class_name: "menu-active-slider menu-slider playback",
              draw_value: false,
              hexpand: true,
              min: 0,
              max: 1,
              onChange: ({ value }) => audio3.speaker.volume = value
            })
          ]
        }),
        Widget.Label({
          vpack: "end",
          class_name: "menu-active-percentage playback",
          label: audio3.speaker.bind("volume").as((v) => `${Math.round(v * 100)}%`)
        })
      ]
    })
  ];
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/audio/active/index.ts
var activeDevices = () => {
  return Widget.Box({
    class_name: "menu-section-container volume",
    vertical: true,
    children: [
      Widget.Box({
        class_name: "menu-label-container volume selected",
        hpack: "fill",
        child: Widget.Label({
          class_name: "menu-label audio volume",
          hexpand: true,
          hpack: "start",
          label: "Volume"
        })
      }),
      Widget.Box({
        class_name: "menu-items-section selected",
        vertical: true,
        children: [
          Widget.Box({
            class_name: "menu-active-container playback",
            vertical: true,
            children: renderActivePlayback()
          }),
          Widget.Box({
            class_name: "menu-active-container input",
            vertical: true,
            children: renderActiveInput()
          })
        ]
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/audio/available/InputDevices.ts
var audio4 = await Service.import("audio");
var renderInputDevices = (inputDevices) => {
  if (inputDevices.length === 0) {
    return [
      Widget.Button({
        class_name: `menu-unfound-button input`,
        child: Widget.Box({
          children: [
            Widget.Box({
              hpack: "start",
              children: [
                Widget.Label({
                  class_name: "menu-button-name input",
                  label: "No input devices found..."
                })
              ]
            })
          ]
        })
      })
    ];
  }
  return inputDevices.map((device) => {
    return Widget.Button({
      on_primary_click: () => audio4.microphone = device,
      class_name: `menu-button audio input ${device}`,
      child: Widget.Box({
        children: [
          Widget.Box({
            hpack: "start",
            children: [
              Widget.Label({
                wrap: true,
                class_name: audio4.microphone.bind("description").as((v) => device.description === v ? "menu-button-icon active input txt-icon" : "menu-button-icon input txt-icon"),
                label: "\uEC1C"
              }),
              Widget.Label({
                truncate: "end",
                wrap: true,
                class_name: audio4.microphone.bind("description").as((v) => device.description === v ? "menu-button-name active input" : "menu-button-name input"),
                label: device.description
              })
            ]
          })
        ]
      })
    });
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/audio/available/PlaybackDevices.ts
var audio5 = await Service.import("audio");
var renderPlaybacks = (playbackDevices) => {
  return playbackDevices.map((device) => {
    if (device.description === "Dummy Output") {
      return Widget.Box({
        class_name: "menu-unfound-button playback",
        child: Widget.Box({
          children: [
            Widget.Label({
              class_name: "menu-button-name playback",
              label: "No playback devices found..."
            })
          ]
        })
      });
    }
    return Widget.Button({
      class_name: `menu-button audio playback ${device}`,
      on_primary_click: () => audio5.speaker = device,
      child: Widget.Box({
        children: [
          Widget.Box({
            hpack: "start",
            children: [
              Widget.Label({
                truncate: "end",
                wrap: true,
                class_name: audio5.speaker.bind("description").as((v) => device.description === v ? "menu-button-icon active playback txt-icon" : "menu-button-icon playback txt-icon"),
                label: "\uE638"
              }),
              Widget.Label({
                truncate: "end",
                wrap: true,
                class_name: audio5.speaker.bind("description").as((v) => device.description === v ? "menu-button-name active playback" : "menu-button-name playback"),
                label: device.description
              })
            ]
          })
        ]
      })
    });
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/audio/available/index.ts
var audio6 = await Service.import("audio");
var availableDevices = () => {
  return Widget.Box({
    vertical: true,
    children: [
      Widget.Box({
        class_name: "menu-section-container playback",
        vertical: true,
        children: [
          Widget.Box({
            class_name: "menu-label-container playback",
            hpack: "fill",
            child: Widget.Label({
              class_name: "menu-label audio playback",
              hexpand: true,
              hpack: "start",
              label: "Playback Devices"
            })
          }),
          Widget.Box({
            class_name: "menu-items-section playback",
            vertical: true,
            children: [
              Widget.Box({
                class_name: "menu-container playback",
                vertical: true,
                children: [
                  Widget.Box({
                    vertical: true,
                    children: audio6.bind("speakers").as((v) => renderPlaybacks(v))
                  })
                ]
              })
            ]
          }),
          Widget.Box({
            class_name: "menu-label-container input",
            hpack: "fill",
            child: Widget.Label({
              class_name: "menu-label audio input",
              hexpand: true,
              hpack: "start",
              label: "Input Devices"
            })
          }),
          Widget.Box({
            class_name: "menu-items-section input",
            vertical: true,
            children: [
              Widget.Box({
                class_name: "menu-container input",
                vertical: true,
                children: [
                  Widget.Box({
                    vertical: true,
                    children: audio6.bind("microphones").as((v) => renderInputDevices(v))
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/audio/index.ts
var audio_default = () => {
  return DropdownMenu_default({
    name: "audiomenu",
    transition: "crossfade",
    child: Widget.Box({
      class_name: "menu-items audio",
      hpack: "fill",
      hexpand: true,
      child: Widget.Box({
        vertical: true,
        hpack: "fill",
        hexpand: true,
        class_name: "menu-items-container audio",
        children: [
          activeDevices(),
          availableDevices()
        ]
      })
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/network/ethernet/index.ts
var network3 = await Service.import("network");
var Ethernet = () => {
  return Widget.Box({
    class_name: "menu-section-container ethernet",
    vertical: true,
    children: [
      Widget.Box({
        class_name: "menu-label-container",
        hpack: "fill",
        child: Widget.Label({
          class_name: "menu-label",
          hexpand: true,
          hpack: "start",
          label: "Ethernet"
        })
      }),
      Widget.Box({
        class_name: "menu-items-section",
        vertical: true,
        child: Widget.Box({
          class_name: "menu-content",
          vertical: true,
          setup: (self) => {
            self.hook(network3, () => {
              return self.child = Widget.Box({
                class_name: "network-element-item",
                child: Widget.Box({
                  hpack: "start",
                  children: [
                    Widget.Icon({
                      class_name: `network-icon ethernet ${network3.wired.state === "activated" ? "active" : ""}`,
                      tooltip_text: network3.wired.internet,
                      icon: `${network3.wired["icon_name"]}`
                    }),
                    Widget.Box({
                      class_name: "connection-container",
                      vertical: true,
                      children: [
                        Widget.Label({
                          class_name: "active-connection",
                          hpack: "start",
                          truncate: "end",
                          wrap: true,
                          label: `Ethernet Connection ${network3.wired.state !== "unknown" && typeof network3.wired?.speed === "number" ? `(${network3.wired?.speed / 1000} Gbps)` : ""}`
                        }),
                        Widget.Label({
                          hpack: "start",
                          class_name: "connection-status dim",
                          label: network3.wired.internet.charAt(0).toUpperCase() + network3.wired.internet.slice(1)
                        })
                      ]
                    })
                  ]
                })
              });
            });
          }
        })
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/network/utils.ts
var getWifiIcon = (iconName) => {
  const deviceIconMap = [
    ["network-wireless-acquiring", "\uDB82\uDD29"],
    ["network-wireless-connected", "\uDB82\uDD28"],
    ["network-wireless-encrypted", "\uDB82\uDD2A"],
    ["network-wireless-hotspot", "\uDB82\uDD28"],
    ["network-wireless-no-route", "\uDB82\uDD29"],
    ["network-wireless-offline", "\uDB82\uDD2E"],
    ["network-wireless-signal-excellent", "\uDB82\uDD28"],
    ["network-wireless-signal-good", "\uDB82\uDD25"],
    ["network-wireless-signal-ok", "\uDB82\uDD22"],
    ["network-wireless-signal-weak", "\uDB82\uDD1F"],
    ["network-wireless-signal-none", "\uDB82\uDD2F"]
  ];
  const foundMatch = deviceIconMap.find((icon) => RegExp(icon[0]).test(iconName.toLowerCase()));
  return foundMatch ? foundMatch[1] : "\uDB82\uDD28";
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/network/wifi/WirelessAPs.ts
var renderWAPs = (self, network4, staging, connecting) => {
  const getIdBySsid = (ssid, nmcliOutput) => {
    const lines = nmcliOutput.trim().split("\n");
    for (const line of lines) {
      const columns = line.trim().split(/\s{2,}/);
      if (columns[0].includes(ssid)) {
        return columns[1];
      }
    }
    return null;
  };
  const WifiStatusMap = {
    unknown: "Status Unknown",
    unmanaged: "Unmanaged",
    unavailable: "Unavailable",
    disconnected: "Disconnected",
    prepare: "Preparing Connecting",
    config: "Connecting",
    need_auth: "Needs Authentication",
    ip_config: "Requesting IP",
    ip_check: "Checking Access",
    secondaries: "Waiting on Secondaries",
    activated: "Connected",
    deactivating: "Disconnecting",
    failed: "Connection Failed"
  };
  self.hook(network4, () => {
    Utils.merge([staging.bind("value"), connecting.bind("value")], () => {
      let WAPs = network4.wifi._device !== undefined ? network4.wifi["access-points"] : [];
      const dedupeWAPs = () => {
        const dedupMap = {};
        WAPs.forEach((item) => {
          if (item.ssid !== null && !Object.hasOwnProperty.call(dedupMap, item.ssid)) {
            dedupMap[item.ssid] = item;
          }
        });
        return Object.keys(dedupMap).map((itm) => dedupMap[itm]);
      };
      WAPs = dedupeWAPs();
      const isInStaging = (wap) => {
        if (Object.keys(staging.value).length === 0) {
          return false;
        }
        return wap.bssid === staging.value.bssid;
      };
      const isDisconnecting = (wap) => {
        if (wap.ssid === network4.wifi.ssid) {
          return network4.wifi.state.toLowerCase() === "deactivating";
        }
        return false;
      };
      const filteredWAPs = WAPs.filter((ap) => {
        return ap.ssid !== "Unknown" && !isInStaging(ap);
      }).sort((a, b) => {
        if (network4.wifi.ssid === a.ssid) {
          return -1;
        }
        if (network4.wifi.ssid === b.ssid) {
          return 1;
        }
        return b.strength - a.strength;
      });
      if (filteredWAPs.length <= 0 && Object.keys(staging.value).length === 0) {
        return self.child = Widget.Label({
          class_name: "waps-not-found dim",
          expand: true,
          hpack: "center",
          vpack: "center",
          label: "No Wi-Fi Networks Found"
        });
      }
      return self.children = filteredWAPs.map((ap) => {
        return Widget.Box({
          children: [
            Widget.Button({
              on_primary_click: () => {
                if (ap.bssid === connecting.value || ap.active) {
                  return;
                }
                connecting.value = ap.bssid || "";
                Utils.execAsync(`nmcli device wifi connect ${ap.bssid}`).then(() => {
                  connecting.value = "";
                  staging.value = {};
                }).catch((err) => {
                  if (err.toLowerCase().includes("secrets were required, but not provided")) {
                    staging.value = ap;
                  } else {
                    Utils.notify({
                      summary: "Network",
                      body: err,
                      timeout: 5000
                    });
                  }
                  connecting.value = "";
                });
              },
              class_name: "network-element-item",
              child: Widget.Box({
                hexpand: true,
                children: [
                  Widget.Box({
                    hpack: "start",
                    hexpand: true,
                    children: [
                      Widget.Label({
                        vpack: "start",
                        class_name: `network-icon wifi ${ap.ssid === network4.wifi.ssid ? "active" : ""} txt-icon`,
                        label: getWifiIcon(`${ap["iconName"]}`)
                      }),
                      Widget.Box({
                        class_name: "connection-container",
                        vpack: "center",
                        vertical: true,
                        children: [
                          Widget.Label({
                            vpack: "center",
                            class_name: "active-connection",
                            hpack: "start",
                            truncate: "end",
                            wrap: true,
                            label: ap.ssid
                          }),
                          Widget.Revealer({
                            revealChild: ap.ssid === network4.wifi.ssid,
                            child: Widget.Label({
                              hpack: "start",
                              class_name: "connection-status dim",
                              label: WifiStatusMap[network4.wifi.state.toLowerCase()]
                            })
                          })
                        ]
                      })
                    ]
                  }),
                  Widget.Revealer({
                    hpack: "end",
                    vpack: "start",
                    reveal_child: ap.bssid === connecting.value || isDisconnecting(ap),
                    child: Widget.Spinner({
                      vpack: "start",
                      class_name: "spinner wap"
                    })
                  })
                ]
              })
            }),
            Widget.Revealer({
              vpack: "start",
              reveal_child: ap.bssid !== connecting.value && ap.active,
              child: Widget.Button({
                tooltip_text: "Delete/Forget Network",
                class_name: "menu-icon-button network disconnect",
                on_primary_click: () => {
                  connecting.value = ap.bssid || "";
                  Utils.execAsync("nmcli connection show --active").then(() => {
                    Utils.execAsync("nmcli connection show --active").then((res) => {
                      const connectionId = getIdBySsid(ap.ssid || "", res);
                      Utils.execAsync(`nmcli connection delete ${connectionId} "${ap.ssid}"`).then(() => connecting.value = "").catch((err) => {
                        connecting.value = "";
                        console.error(`Error while forgetting "${ap.ssid}": ${err}`);
                      });
                    });
                  });
                },
                child: Widget.Label({
                  class_name: "txt-icon delete-network",
                  label: "\uDB81\uDE83"
                })
              })
            })
          ]
        });
      });
    });
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/network/wifi/APStaging.ts
var renderWapStaging = (self, network4, staging, connecting) => {
  Utils.merge([network4.bind("wifi"), staging.bind("value")], () => {
    if (!Object.keys(staging.value).length) {
      return self.child = Widget.Box();
    }
    return self.child = Widget.Box({
      class_name: "network-element-item staging",
      vertical: true,
      children: [
        Widget.Box({
          hpack: "fill",
          hexpand: true,
          children: [
            Widget.Icon({
              class_name: `network-icon wifi`,
              icon: `${staging.value.iconName}`
            }),
            Widget.Box({
              class_name: "connection-container",
              hexpand: true,
              vertical: true,
              children: [
                Widget.Label({
                  class_name: "active-connection",
                  hpack: "start",
                  truncate: "end",
                  wrap: true,
                  label: staging.value.ssid
                })
              ]
            }),
            Widget.Revealer({
              hpack: "end",
              reveal_child: connecting.bind("value").as((c) => staging.value.bssid === c),
              child: Widget.Spinner({
                class_name: "spinner wap"
              })
            })
          ]
        }),
        Widget.Box({
          class_name: "network-password-input-container",
          hpack: "fill",
          hexpand: true,
          children: [
            Widget.Entry({
              hpack: "start",
              hexpand: true,
              visibility: false,
              class_name: "network-password-input",
              placeholder_text: "enter password",
              onAccept: (selfInp) => {
                connecting.value = staging.value.bssid || "";
                Utils.execAsync(`nmcli dev wifi connect ${staging.value.bssid} password ${selfInp.text}`).catch((err) => {
                  connecting.value = "";
                  console.error(`Failed to connect to wifi: ${staging.value.ssid}... ${err}`);
                  Utils.notify({
                    summary: "Network",
                    body: err,
                    timeout: 5000
                  });
                }).then(() => {
                  connecting.value = "";
                  staging.value = {};
                });
                selfInp.text = "";
              }
            }),
            Widget.Button({
              hpack: "end",
              class_name: "close-network-password-input-button",
              on_primary_click: () => {
                connecting.value = "";
                staging.value = {};
              },
              child: Widget.Icon({
                class_name: "close-network-password-input-icon",
                icon: "window-close-symbolic"
              })
            })
          ]
        })
      ]
    });
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/network/wifi/index.ts
var network4 = await Service.import("network");
var Staging = Variable({});
var Connecting = Variable("");
var searchInProgress = Variable(false);
var startRotation = () => {
  searchInProgress.value = true;
  setTimeout(() => {
    searchInProgress.value = false;
  }, 5 * 1000);
};
var Wifi = () => {
  return Widget.Box({
    class_name: "menu-section-container wifi",
    vertical: true,
    children: [
      Widget.Box({
        class_name: "menu-label-container",
        hpack: "fill",
        children: [
          Widget.Label({
            class_name: "menu-label",
            hexpand: true,
            hpack: "start",
            label: "Wi-Fi"
          }),
          Widget.Button({
            vpack: "center",
            hpack: "end",
            class_name: "menu-icon-button search network",
            on_primary_click: () => {
              startRotation();
              network4.wifi.scan();
            },
            child: Widget.Icon({
              class_name: searchInProgress.bind("value").as((v) => v ? "spinning" : ""),
              icon: "view-refresh-symbolic"
            })
          })
        ]
      }),
      Widget.Box({
        class_name: "menu-items-section",
        vertical: true,
        children: [
          Widget.Box({
            class_name: "wap-staging",
            setup: (self) => {
              renderWapStaging(self, network4, Staging, Connecting);
            }
          }),
          Widget.Box({
            class_name: "available-waps",
            vertical: true,
            setup: (self) => {
              renderWAPs(self, network4, Staging, Connecting);
            }
          })
        ]
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/network/index.ts
var network_default = () => {
  return DropdownMenu_default({
    name: "networkmenu",
    transition: "crossfade",
    child: Widget.Box({
      class_name: "menu-items network",
      child: Widget.Box({
        vertical: true,
        hexpand: true,
        class_name: "menu-items-container network",
        children: [Ethernet(), Wifi()]
      })
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/bluetooth/devices/label.ts
var label = (bluetooth3) => {
  const searchInProgress2 = Variable(false);
  const startRotation2 = () => {
    searchInProgress2.value = true;
    setTimeout(() => {
      searchInProgress2.value = false;
    }, 10 * 1000);
  };
  return Widget.Box({
    class_name: "menu-label-container",
    hpack: "fill",
    vpack: "start",
    children: [
      Widget.Label({
        class_name: "menu-label",
        vpack: "center",
        hpack: "start",
        label: "Bluetooth"
      }),
      Widget.Box({
        class_name: "controls-container",
        vpack: "start",
        children: [
          Widget.Switch({
            class_name: "menu-switch bluetooth",
            hexpand: true,
            hpack: "end",
            active: bluetooth3.bind("enabled"),
            on_activate: ({ active: active2 }) => {
              searchInProgress2.value = false;
              Utils.execAsync([
                "bash",
                "-c",
                `bluetoothctl power ${active2 ? "on" : "off"}`
              ]).catch((err) => console.error(`bluetoothctl power ${active2 ? "on" : "off"}`, err));
            }
          }),
          Widget.Separator({
            class_name: "menu-separator bluetooth"
          }),
          Widget.Button({
            vpack: "center",
            class_name: "menu-icon-button search",
            on_primary_click: () => {
              startRotation2();
              Utils.execAsync([
                "bash",
                "-c",
                "bluetoothctl --timeout 120 scan on"
              ]).catch((err) => {
                searchInProgress2.value = false;
                console.error("bluetoothctl --timeout 120 scan on", err);
              });
            },
            child: Widget.Icon({
              class_name: searchInProgress2.bind("value").as((v) => v ? "spinning" : ""),
              icon: "view-refresh-symbolic"
            })
          })
        ]
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/bluetooth/devices/connectedControls.ts
var connectedControls = (dev, connectedDevices) => {
  if (!connectedDevices.includes(dev.address)) {
    return Widget.Box({});
  }
  return Widget.Box({
    vpack: "start",
    class_name: "bluetooth-controls",
    children: [
      Widget.Button({
        class_name: "menu-icon-button unpair bluetooth",
        child: Widget.Label({
          tooltip_text: dev.paired ? "Unpair" : "Pair",
          class_name: "menu-icon-button-label unpair bluetooth txt-icon",
          label: dev.paired ? "\uF0C1" : "\uF127"
        }),
        on_primary_click: () => Utils.execAsync([
          "bash",
          "-c",
          `bluetoothctl ${dev.paired ? "unpair" : "pair"} ${dev.address}`
        ]).catch((err) => console.error(`bluetoothctl ${dev.paired ? "unpair" : "pair"} ${dev.address}`, err))
      }),
      Widget.Button({
        class_name: "menu-icon-button disconnect bluetooth",
        child: Widget.Label({
          tooltip_text: dev.connected ? "Disconnect" : "Connect",
          class_name: "menu-icon-button-label disconnect bluetooth txt-icon",
          label: dev.connected ? "\uDB85\uDE16" : "\uEAD0"
        }),
        on_primary_click: () => dev.setConnection(!dev.connected)
      }),
      Widget.Button({
        class_name: "menu-icon-button untrust bluetooth",
        child: Widget.Label({
          tooltip_text: dev.trusted ? "Untrust" : "Trust",
          class_name: "menu-icon-button-label untrust bluetooth txt-icon",
          label: dev.trusted ? "\uED9F" : "\uDB85\uDDA1"
        }),
        on_primary_click: () => Utils.execAsync([
          "bash",
          "-c",
          `bluetoothctl ${dev.trusted ? "untrust" : "trust"} ${dev.address}`
        ]).catch((err) => console.error(`bluetoothctl ${dev.trusted ? "untrust" : "trust"} ${dev.address}`, err))
      }),
      Widget.Button({
        class_name: "menu-icon-button delete bluetooth",
        child: Widget.Label({
          tooltip_text: "Forget",
          class_name: "menu-icon-button-label delete bluetooth txt-icon",
          label: "\uDB80\uDDB4"
        }),
        on_primary_click: () => {
          Utils.execAsync([
            "bash",
            "-c",
            `bluetoothctl remove ${dev.address}`
          ]).catch((err) => console.error("Bluetooth Remove", err));
        }
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/bluetooth/utils.ts
var getBluetoothIcon = (iconName) => {
  const deviceIconMap = [
    ["^audio-card*", "\uDB80\uDF84"],
    ["^audio-headphones*", "\uDB80\uDECB"],
    ["^audio-headset*", "\uDB80\uDECE"],
    ["^audio-input*", "\uDB80\uDF6C"],
    ["^audio-speakers*", "\uDB81\uDCC3"],
    ["^bluetooth*", "\uDB80\uDCAF"],
    ["^camera*", "\uDB80\uDD00"],
    ["^computer*", "\uDB81\uDFC0"],
    ["^input-gaming*", "\uDB80\uDF6C"],
    ["^input-keyboard*", "\uDB80\uDF0C"],
    ["^input-mouse*", "\uDB80\uDF7D"],
    ["^input-tablet*", "\uDB81\uDCF6"],
    ["^media*", "\uDB85\uDEDF"],
    ["^modem*", "\uDB84\uDC87"],
    ["^network*", "\uDB84\uDC87"],
    ["^phone*", "\uDB80\uDD1E"],
    ["^printer*", "\uDB81\uDC2A"],
    ["^scanner*", "\uDB81\uDEAB"],
    ["^video-camera*", "\uDB81\uDD67"]
  ];
  const foundMatch = deviceIconMap.find((icon) => RegExp(icon[0]).test(iconName.toLowerCase()));
  return foundMatch ? foundMatch[1] : "\uDB80\uDCAF";
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/bluetooth/devices/devicelist.ts
var devices = (bluetooth3, self) => {
  return self.hook(bluetooth3, () => {
    if (!bluetooth3.enabled) {
      return self.child = Widget.Box({
        class_name: "bluetooth-items",
        vertical: true,
        expand: true,
        vpack: "center",
        hpack: "center",
        children: [
          Widget.Label({
            class_name: "bluetooth-disabled dim",
            hexpand: true,
            label: "Bluetooth is disabled"
          })
        ]
      });
    }
    const availableDevices2 = bluetooth3.devices.filter((btDev) => btDev.name !== null).sort((a, b) => {
      if (a.connected || a.paired) {
        return -1;
      }
      if (b.connected || b.paired) {
        return 1;
      }
      return b.name - a.name;
    });
    const conDevNames = availableDevices2.filter((d) => d.connected || d.paired).map((d) => d.address);
    if (!availableDevices2.length) {
      return self.child = Widget.Box({
        class_name: "bluetooth-items",
        vertical: true,
        expand: true,
        vpack: "center",
        hpack: "center",
        children: [
          Widget.Label({
            class_name: "no-bluetooth-devices dim",
            hexpand: true,
            label: "No devices currently found"
          }),
          Widget.Label({
            class_name: "search-bluetooth-label dim",
            hexpand: true,
            label: "Press '\uDB81\uDC50' to search"
          })
        ]
      });
    }
    return self.child = Widget.Box({
      vertical: true,
      children: availableDevices2.map((device) => {
        return Widget.Box({
          children: [
            Widget.Button({
              hexpand: true,
              class_name: `bluetooth-element-item ${device}`,
              on_primary_click: () => {
                if (!conDevNames.includes(device.address))
                  device.setConnection(true);
              },
              child: Widget.Box({
                hexpand: true,
                children: [
                  Widget.Box({
                    hexpand: true,
                    hpack: "start",
                    class_name: "menu-button-container",
                    children: [
                      Widget.Label({
                        vpack: "start",
                        class_name: `menu-button-icon bluetooth ${conDevNames.includes(device.address) ? "active" : ""} txt-icon`,
                        label: getBluetoothIcon(`${device["icon-name"]}-symbolic`)
                      }),
                      Widget.Box({
                        vertical: true,
                        vpack: "center",
                        children: [
                          Widget.Label({
                            vpack: "center",
                            hpack: "start",
                            class_name: "menu-button-name bluetooth",
                            truncate: "end",
                            wrap: true,
                            label: device.alias
                          }),
                          Widget.Revealer({
                            hpack: "start",
                            reveal_child: device.connected || device.paired,
                            child: Widget.Label({
                              hpack: "start",
                              class_name: "connection-status dim",
                              label: device.connected ? "Connected" : "Paired"
                            })
                          })
                        ]
                      })
                    ]
                  }),
                  Widget.Box({
                    hpack: "end",
                    children: device.connecting ? [
                      Widget.Spinner({
                        vpack: "start",
                        class_name: "spinner bluetooth"
                      })
                    ] : []
                  })
                ]
              })
            }),
            connectedControls(device, conDevNames)
          ]
        });
      })
    });
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/bluetooth/devices/index.ts
var bluetooth3 = await Service.import("bluetooth");
var Devices = () => {
  return Widget.Box({
    class_name: "menu-section-container",
    vertical: true,
    children: [
      label(bluetooth3),
      Widget.Box({
        class_name: "menu-items-section",
        child: Widget.Box({
          class_name: "menu-content",
          vertical: true,
          setup: (self) => {
            devices(bluetooth3, self);
          }
        })
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/bluetooth/index.ts
var bluetooth_default = () => {
  return DropdownMenu_default({
    name: "bluetoothmenu",
    transition: "crossfade",
    child: Widget.Box({
      class_name: "menu-items bluetooth",
      hpack: "fill",
      hexpand: true,
      child: Widget.Box({
        vertical: true,
        hpack: "fill",
        hexpand: true,
        class_name: "menu-items-container bluetooth",
        child: Devices()
      })
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/media/components/mediainfo.ts
var media3 = await Service.import("mpris");
var MediaInfo = (getPlayerInfo) => {
  return Widget.Box({
    class_name: "media-indicator-current-media-info",
    hpack: "center",
    hexpand: true,
    vertical: true,
    children: [
      Widget.Box({
        class_name: "media-indicator-current-song-name",
        hpack: "center",
        children: [
          Widget.Label({
            truncate: "end",
            max_width_chars: 31,
            wrap: true,
            class_name: "media-indicator-current-song-name-label",
            setup: (self) => {
              self.hook(media3, () => {
                const curPlayer = getPlayerInfo();
                return self.label = curPlayer !== undefined && curPlayer["track-title"].length ? curPlayer["track-title"] : "No Media Currently Playing";
              });
            }
          })
        ]
      }),
      Widget.Box({
        class_name: "media-indicator-current-song-author",
        hpack: "center",
        children: [
          Widget.Label({
            truncate: "end",
            wrap: true,
            max_width_chars: 35,
            class_name: "media-indicator-current-song-author-label",
            setup: (self) => {
              self.hook(media3, () => {
                const curPlayer = getPlayerInfo();
                const makeArtistList = (trackArtists) => {
                  if (trackArtists.length === 1 && !trackArtists[0].length) {
                    return "-----";
                  }
                  return trackArtists.join(", ");
                };
                return self.label = curPlayer !== undefined && curPlayer["track-artists"].length ? makeArtistList(curPlayer["track-artists"]) : "-----";
              });
            }
          })
        ]
      }),
      Widget.Box({
        class_name: "media-indicator-current-song-album",
        hpack: "center",
        children: [
          Widget.Label({
            truncate: "end",
            wrap: true,
            max_width_chars: 40,
            class_name: "media-indicator-current-song-album-label",
            setup: (self) => {
              self.hook(media3, () => {
                const curPlayer = getPlayerInfo();
                return self.label = curPlayer !== undefined && curPlayer["track-album"].length ? curPlayer["track-album"] : "---";
              });
            }
          })
        ]
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/media/components/controls.ts
var media4 = await Service.import("mpris");
var Controls = (getPlayerInfo) => {
  const isLoopActive = (player) => {
    return player["loop-status"] !== null && ["track", "playlist"].includes(player["loop-status"].toLowerCase()) ? "active" : "";
  };
  const isShuffleActive = (player) => {
    return player["shuffle-status"] !== null && player["shuffle-status"] ? "active" : "";
  };
  return Widget.Box({
    class_name: "media-indicator-current-player-controls",
    vertical: true,
    children: [
      Widget.Box({
        class_name: "media-indicator-current-controls",
        hpack: "center",
        children: [
          Widget.Box({
            class_name: "media-indicator-control shuffle",
            children: [
              Widget.Button({
                hpack: "center",
                hasTooltip: true,
                setup: (self) => {
                  self.hook(media4, () => {
                    const foundPlayer = getPlayerInfo();
                    if (foundPlayer === undefined) {
                      self.tooltip_text = "Unavailable";
                      self.class_name = "media-indicator-control-button shuffle disabled";
                      return;
                    }
                    self.tooltip_text = foundPlayer.shuffle_status !== null ? foundPlayer.shuffle_status ? "Shuffling" : "Not Shuffling" : null;
                    self.on_primary_click = () => foundPlayer.shuffle();
                    self.class_name = `media-indicator-control-button shuffle ${isShuffleActive(foundPlayer)} ${foundPlayer.shuffle_status !== null ? "enabled" : "disabled"}`;
                  });
                },
                child: Widget.Icon(icons_default2.mpris.shuffle["enabled"])
              })
            ]
          }),
          Widget.Box({
            children: [
              Widget.Button({
                hpack: "center",
                child: Widget.Icon(icons_default2.mpris.prev),
                setup: (self) => {
                  self.hook(media4, () => {
                    const foundPlayer = getPlayerInfo();
                    if (foundPlayer === undefined) {
                      self.class_name = "media-indicator-control-button prev disabled";
                      return;
                    }
                    self.on_primary_click = () => foundPlayer.previous();
                    self.class_name = `media-indicator-control-button prev ${foundPlayer.can_go_prev !== null && foundPlayer.can_go_prev ? "enabled" : "disabled"}`;
                  });
                }
              })
            ]
          }),
          Widget.Box({
            children: [
              Widget.Button({
                hpack: "center",
                setup: (self) => {
                  self.hook(media4, () => {
                    const foundPlayer = getPlayerInfo();
                    if (foundPlayer === undefined) {
                      self.class_name = "media-indicator-control-button play disabled";
                      return;
                    }
                    self.on_primary_click = () => foundPlayer.playPause();
                    self.class_name = `media-indicator-control-button play ${foundPlayer.can_play !== null ? "enabled" : "disabled"}`;
                  });
                },
                child: Widget.Icon({
                  icon: Utils.watch(icons_default2.mpris.paused, media4, "changed", () => {
                    const foundPlayer = getPlayerInfo();
                    if (foundPlayer === undefined) {
                      return icons_default2.mpris["paused"];
                    }
                    return icons_default2.mpris[foundPlayer.play_back_status.toLowerCase()];
                  })
                })
              })
            ]
          }),
          Widget.Box({
            class_name: `media-indicator-control next`,
            children: [
              Widget.Button({
                hpack: "center",
                child: Widget.Icon(icons_default2.mpris.next),
                setup: (self) => {
                  self.hook(media4, () => {
                    const foundPlayer = getPlayerInfo();
                    if (foundPlayer === undefined) {
                      self.class_name = "media-indicator-control-button next disabled";
                      return;
                    }
                    self.on_primary_click = () => foundPlayer.next();
                    self.class_name = `media-indicator-control-button next ${foundPlayer.can_go_next !== null && foundPlayer.can_go_next ? "enabled" : "disabled"}`;
                  });
                }
              })
            ]
          }),
          Widget.Box({
            class_name: "media-indicator-control loop",
            children: [
              Widget.Button({
                hpack: "center",
                setup: (self) => {
                  self.hook(media4, () => {
                    const foundPlayer = getPlayerInfo();
                    if (foundPlayer === undefined) {
                      self.tooltip_text = "Unavailable";
                      self.class_name = "media-indicator-control-button shuffle disabled";
                      return;
                    }
                    self.tooltip_text = foundPlayer.loop_status !== null ? foundPlayer.loop_status ? "Shuffling" : "Not Shuffling" : null;
                    self.on_primary_click = () => foundPlayer.loop();
                    self.class_name = `media-indicator-control-button loop ${isLoopActive(foundPlayer)} ${foundPlayer.loop_status !== null ? "enabled" : "disabled"}`;
                  });
                },
                child: Widget.Icon({
                  setup: (self) => {
                    self.hook(media4, () => {
                      const foundPlayer = getPlayerInfo();
                      if (foundPlayer === undefined) {
                        self.icon = icons_default2.mpris.loop["none"];
                        return;
                      }
                      self.icon = foundPlayer.loop_status === null ? icons_default2.mpris.loop["none"] : icons_default2.mpris.loop[foundPlayer.loop_status?.toLowerCase()];
                    });
                  }
                })
              })
            ]
          })
        ]
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/media/components/bar.ts
var media5 = await Service.import("mpris");
var Bar2 = (getPlayerInfo) => {
  return Widget.Box({
    class_name: "media-indicator-current-progress-bar",
    hexpand: true,
    children: [
      Widget.Box({
        hexpand: true,
        child: Widget.Slider({
          hexpand: true,
          tooltip_text: "--",
          class_name: "menu-slider media progress",
          draw_value: false,
          on_change: ({ value }) => {
            const foundPlayer = getPlayerInfo(media5);
            if (foundPlayer === undefined) {
              return;
            }
            return foundPlayer.position = value * foundPlayer.length;
          },
          setup: (self) => {
            const update = () => {
              const foundPlayer = getPlayerInfo(media5);
              if (foundPlayer !== undefined) {
                const value = foundPlayer.length ? foundPlayer.position / foundPlayer.length : 0;
                self.value = value > 0 ? value : 0;
              } else {
                self.value = 0;
              }
            };
            self.hook(media5, update);
            self.poll(1000, update);
            function updateTooltip() {
              const foundPlayer = getPlayerInfo(media5);
              if (foundPlayer === undefined) {
                return self.tooltip_text = "00:00";
              }
              const curHour = Math.floor(foundPlayer.position / 3600);
              const curMin = Math.floor(foundPlayer.position % 3600 / 60);
              const curSec = Math.floor(foundPlayer.position % 60);
              if (typeof foundPlayer.position === "number" && foundPlayer.position >= 0) {
                self.tooltip_text = `${curHour > 0 ? (curHour < 10 ? "0" + curHour : curHour) + ":" : ""}${curMin < 10 ? "0" + curMin : curMin}:${curSec < 10 ? "0" + curSec : curSec}`;
              } else {
                self.tooltip_text = `00:00`;
              }
            }
            self.poll(1000, updateTooltip);
            self.hook(media5, updateTooltip);
          }
        })
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/media/media.ts
var media6 = await Service.import("mpris");
var { tint, color } = options_default.theme.bar.menus.menu.media.card;
var generateAlbumArt = (imageUrl) => {
  const userTint = tint.value;
  const userHexColor = color.value;
  let css;
  const r = parseInt(userHexColor.slice(1, 3), 16);
  const g = parseInt(userHexColor.slice(3, 5), 16);
  const b = parseInt(userHexColor.slice(5, 7), 16);
  const alpha = userTint / 100;
  css = `background-image: linear-gradient(
                rgba(${r}, ${g}, ${b}, ${alpha}),
                rgba(${r}, ${g}, ${b}, ${alpha}),
                ${userHexColor} 65em
            ), url("${imageUrl}");`;
  return css;
};
var Media2 = () => {
  const curPlayer = Variable("");
  media6.connect("changed", () => {
    const statusOrder = {
      Playing: 1,
      Paused: 2,
      Stopped: 3
    };
    const isPlaying = media6.players.find((p) => p["play-back-status"] === "Playing");
    const playerStillExists = media6.players.some((p) => curPlayer.value === p["bus-name"]);
    const nextPlayerUp = media6.players.sort((a, b) => statusOrder[a["play-back-status"]] - statusOrder[b["play-back-status"]])[0].bus_name;
    if (isPlaying || !playerStillExists) {
      curPlayer.value = nextPlayerUp;
    }
  });
  const getPlayerInfo = () => {
    return media6.players.find((p) => p.bus_name === curPlayer.value) || media6.players[0];
  };
  return Widget.Box({
    class_name: "menu-section-container",
    children: [
      Widget.Box({
        class_name: "menu-items-section",
        vertical: false,
        child: Widget.Box({
          class_name: "menu-content",
          children: [
            Widget.Box({
              class_name: "media-content",
              child: Widget.Box({
                class_name: "media-indicator-right-section",
                hpack: "fill",
                hexpand: true,
                vertical: true,
                children: [
                  MediaInfo(getPlayerInfo),
                  Controls(getPlayerInfo),
                  Bar2(getPlayerInfo)
                ]
              })
            })
          ],
          setup: (self) => {
            self.hook(media6, () => {
              const curPlayer2 = getPlayerInfo();
              if (curPlayer2 !== undefined) {
                self.css = generateAlbumArt(curPlayer2.track_cover_url);
              }
            });
            Utils.merge([color.bind("value"), tint.bind("value")], () => {
              const curPlayer2 = getPlayerInfo();
              if (curPlayer2 !== undefined) {
                self.css = generateAlbumArt(curPlayer2.track_cover_url);
              }
            });
          }
        })
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/media/index.ts
var media_default = () => {
  return DropdownMenu_default({
    name: "mediamenu",
    transition: "crossfade",
    child: Widget.Box({
      class_name: "menu-items media",
      hpack: "fill",
      hexpand: true,
      child: Widget.Box({
        class_name: "menu-items-container media",
        hpack: "fill",
        hexpand: true,
        child: Media2()
      })
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/notifications/controls/index.ts
var Controls2 = (notifs2) => {
  return Widget.Box({
    class_name: "notification-menu-controls",
    expand: false,
    vertical: false,
    children: [
      Widget.Box({
        class_name: "menu-label-container notifications",
        hpack: "start",
        vpack: "center",
        expand: true,
        children: [
          Widget.Label({
            class_name: "menu-label notifications",
            label: "Notifications"
          })
        ]
      }),
      Widget.Box({
        hpack: "end",
        vpack: "center",
        expand: false,
        children: [
          Widget.Switch({
            class_name: "menu-switch notifications",
            vpack: "center",
            active: notifs2.bind("dnd").as((dnd) => !dnd),
            on_activate: ({ active: active2 }) => {
              notifs2.dnd = !active2;
            }
          }),
          Widget.Box({
            children: [
              Widget.Separator({
                hpack: "center",
                vexpand: true,
                vertical: true,
                class_name: "menu-separator notification-controls"
              }),
              Widget.Button({
                class_name: "clear-notifications-button",
                tooltip_text: "Clear Notifications",
                on_primary_click: () => notifs2.clear(),
                child: Widget.Label({
                  class_name: "clear-notifications-label txt-icon",
                  label: "\uF2D3"
                })
              })
            ]
          })
        ]
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/notifications/utils.ts
var notifHasImg = (notif) => {
  return notif.image !== undefined && notif.image.length;
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/notifications/notification/header/index.ts
import GLib6 from "gi://GLib";

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/notifications/notification/header/icon.ts
var NotificationIcon = ({ app_entry, app_icon, app_name }) => {
  let icon = icons_default2.fallback.notification;
  if (Utils.lookUpIcon(app_name) || Utils.lookUpIcon(app_name.toLowerCase() || ""))
    icon = Utils.lookUpIcon(app_name) ? app_name : Utils.lookUpIcon(app_name.toLowerCase()) ? app_name.toLowerCase() : "";
  if (Utils.lookUpIcon(app_icon) && icon === "")
    icon = app_icon;
  if (Utils.lookUpIcon(app_entry || "") && icon === "")
    icon = app_entry || "";
  return Widget.Box({
    css: `
                min-width: 2rem;
                min-height: 2rem;
              `,
    child: Widget.Icon({
      class_name: "notification-icon menu",
      icon
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/notifications/notification/header/index.ts
var time2 = (time3, format2 = "%I:%M %p") => GLib6.DateTime.new_from_unix_local(time3).format(format2);
var Header = (notif) => {
  return Widget.Box({
    vertical: false,
    hexpand: true,
    children: [
      Widget.Box({
        class_name: "notification-card-header menu",
        hpack: "start",
        children: [NotificationIcon(notif)]
      }),
      Widget.Box({
        class_name: "notification-card-header menu",
        hexpand: true,
        vpack: "start",
        children: [
          Widget.Label({
            class_name: "notification-card-header-label menu",
            hpack: "start",
            hexpand: true,
            vexpand: true,
            max_width_chars: !notifHasImg(notif) ? 34 : 22,
            truncate: "end",
            wrap: true,
            label: notif["summary"]
          })
        ]
      }),
      Widget.Box({
        class_name: "notification-card-header menu",
        hpack: "end",
        vpack: "start",
        hexpand: true,
        child: Widget.Label({
          vexpand: true,
          class_name: "notification-time",
          label: time2(notif.time)
        })
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/notifications/notification/actions/index.ts
var Actions = (notif, notifs2) => {
  if (notif.actions !== undefined && notif.actions.length > 0) {
    return Widget.Box({
      class_name: "notification-card-actions menu",
      hexpand: true,
      vpack: "end",
      children: notif.actions.map((action) => {
        return Widget.Button({
          hexpand: true,
          class_name: "notification-action-buttons menu",
          on_primary_click: () => {
            if (action.id.includes("scriptAction:-")) {
              App.closeWindow("notificationsmenu");
              Utils.execAsync(`${action.id.replace("scriptAction:-", "")}`).catch((err) => console.error(err));
              notifs2.CloseNotification(notif.id);
            } else {
              App.closeWindow("notificationsmenu");
              notif.invoke(action.id);
            }
          },
          child: Widget.Box({
            hpack: "center",
            hexpand: true,
            children: [
              Widget.Label({
                class_name: "notification-action-buttons-label menu",
                hexpand: true,
                max_width_chars: 15,
                truncate: "end",
                wrap: true,
                label: action.label
              })
            ]
          })
        });
      })
    });
  }
  return Widget.Box({
    class_name: "spacer"
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/notifications/notification/image/index.ts
var Image = (notif) => {
  if (notifHasImg(notif)) {
    return Widget.Box({
      class_name: "notification-card-image-container menu",
      hpack: "center",
      vpack: "center",
      vexpand: false,
      child: Widget.Box({
        hpack: "center",
        vexpand: false,
        class_name: "notification-card-image menu",
        css: `background-image: url("${notif.image}")`
      })
    });
  }
  return Widget.Box();
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/notifications/notification/placeholder/index.ts
var Placeholder = (notifs2) => {
  return Widget.Box({
    class_name: "notification-label-container",
    vpack: "fill",
    hpack: "center",
    expand: true,
    child: Widget.Box({
      vpack: "center",
      vertical: true,
      expand: true,
      children: [
        Widget.Label({
          vpack: "center",
          class_name: "placeholder-label dim bell",
          label: notifs2.bind("dnd").as((dnd) => dnd ? "\uDB80\uDC9B" : "\uDB80\uDC9A")
        }),
        Widget.Label({
          vpack: "start",
          class_name: "placehold-label dim message",
          label: "All caught up :]"
        })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/notifications/notification/body/index.ts
var Body = (notif) => {
  return Widget.Box({
    vpack: "start",
    hexpand: true,
    class_name: "notification-card-body menu",
    children: [
      Widget.Label({
        hexpand: true,
        use_markup: true,
        xalign: 0,
        justification: "left",
        truncate: "end",
        lines: 2,
        max_width_chars: !notifHasImg(notif) ? 35 : 28,
        wrap: true,
        class_name: "notification-card-body-label menu",
        label: notif["body"]
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/notifications/notification/close/index.ts
var CloseButton = (notif, notifs2) => {
  return Widget.Button({
    class_name: "close-notification-button menu",
    on_primary_click: () => {
      notifs2.CloseNotification(notif.id);
    },
    child: Widget.Label({
      class_name: "txt-icon notif-close",
      label: "\uDB80\uDD5C",
      hpack: "center"
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/notifications/notification/index.ts
var NotificationCard = (notifs2) => {
  return Widget.Box({
    class_name: "menu-content-container notifications",
    hpack: "center",
    vexpand: true,
    spacing: 0,
    vertical: true,
    setup: (self) => {
      self.hook(notifs2, () => {
        const sortedNotifications = notifs2.notifications.sort((a, b) => b.time - a.time);
        if (notifs2.notifications.length <= 0) {
          return self.children = [Placeholder(notifs2)];
        }
        return self.children = sortedNotifications.map((notif) => {
          return Widget.Box({
            class_name: "notification-card-content-container",
            children: [
              Widget.Box({
                class_name: "notification-card menu",
                vpack: "start",
                hexpand: true,
                vexpand: false,
                children: [
                  Image(notif),
                  Widget.Box({
                    vpack: "center",
                    vertical: true,
                    hexpand: true,
                    class_name: `notification-card-content ${!notifHasImg(notif) ? "noimg" : " menu"}`,
                    children: [
                      Header(notif),
                      Body(notif),
                      Actions(notif, notifs2)
                    ]
                  })
                ]
              }),
              CloseButton(notif, notifs2)
            ]
          });
        });
      });
    }
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/notifications/index.ts
var notifs2 = await Service.import("notifications");
var notifications_default = () => {
  return DropdownMenu_default({
    name: "notificationsmenu",
    transition: "crossfade",
    child: Widget.Box({
      class_name: "notification-menu-content",
      css: "padding: 1px; margin: -1px;",
      hexpand: true,
      vexpand: false,
      children: [
        Widget.Box({
          class_name: "notification-card-container menu",
          vertical: true,
          hexpand: false,
          vexpand: false,
          children: [Controls2(notifs2), NotificationCard(notifs2)]
        })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/calendar/time/index.ts
var { military } = options_default.menus.clock.time;
var time3 = Variable("", {
  poll: [1000, 'date "+%I:%M:%S"']
});
var period = Variable("", {
  poll: [1000, 'date "+%p"']
});
var militaryTime = Variable("", {
  poll: [1000, 'date "+%H:%M:%S"']
});
var TimeWidget = () => {
  return Widget.Box({
    class_name: "calendar-menu-item-container clock",
    hexpand: true,
    vpack: "center",
    hpack: "fill",
    child: Widget.Box({
      hexpand: true,
      vpack: "center",
      hpack: "center",
      class_name: "clock-content-items",
      children: military.bind("value").as((is24hr) => {
        if (!is24hr) {
          return [
            Widget.Box({
              hpack: "center",
              children: [
                Widget.Label({
                  class_name: "clock-content-time",
                  label: time3.bind()
                })
              ]
            }),
            Widget.Box({
              hpack: "center",
              children: [
                Widget.Label({
                  vpack: "end",
                  class_name: "clock-content-period",
                  label: period.bind()
                })
              ]
            })
          ];
        }
        return [
          Widget.Box({
            hpack: "center",
            children: [
              Widget.Label({
                class_name: "clock-content-time",
                label: militaryTime.bind()
              })
            ]
          })
        ];
      })
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/calendar/calendar.ts
var CalendarWidget = () => {
  return Widget.Box({
    class_name: "calendar-menu-item-container calendar",
    hpack: "fill",
    vpack: "fill",
    expand: true,
    child: Widget.Box({
      class_name: "calendar-container-box",
      child: Widget.Calendar({
        expand: true,
        hpack: "fill",
        vpack: "fill",
        class_name: "calendar-menu-widget",
        showDayNames: true,
        showDetails: false,
        showHeading: true
      })
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/calendar/index.ts
var calendar_default = () => {
  return DropdownMenu_default({
    name: "calendarmenu",
    transition: "crossfade",
    child: Widget.Box({
      class_name: "calendar-menu-content",
      css: "padding: 1px; margin: -1px;",
      vexpand: false,
      children: [
        Widget.Box({
          class_name: "calendar-content-container",
          vertical: true,
          children: [
            Widget.Box({
              class_name: "calendar-content-items",
              vertical: true,
              children: [TimeWidget(), CalendarWidget()]
            })
          ]
        })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/energy/profiles/index.ts
var powerProfiles = await Service.import("powerprofiles");
var EnergyProfiles = () => {
  return Widget.Box({
    class_name: "menu-section-container energy",
    vertical: true,
    children: [
      Widget.Box({
        class_name: "menu-label-container",
        hpack: "fill",
        child: Widget.Label({
          class_name: "menu-label",
          hexpand: true,
          hpack: "start",
          label: "Power Profile"
        })
      }),
      Widget.Box({
        class_name: "menu-items-section",
        vpack: "fill",
        vexpand: true,
        vertical: true,
        children: powerProfiles.bind("profiles").as((profiles) => {
          return profiles.map((prof) => {
            const ProfileLabels = {
              "power-saver": "Power Saver",
              balanced: "Balanced",
              performance: "Performance"
            };
            return Widget.Button({
              on_primary_click: () => {
                powerProfiles.active_profile = prof.Profile;
              },
              class_name: powerProfiles.bind("active_profile").as((active2) => {
                return `power-profile-item ${active2 === prof.Profile ? "active" : ""}`;
              }),
              child: Widget.Box({
                children: [
                  Widget.Icon({
                    class_name: "power-profile-icon",
                    icon: icons_default2.powerprofile[prof.Profile]
                  }),
                  Widget.Label({
                    class_name: "power-profile-label",
                    label: ProfileLabels[prof.Profile]
                  })
                ]
              })
            });
          });
        })
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/services/Brightness.ts
if (!dependencies("brightnessctl"))
  App.quit();
var get = (args) => Number(Utils.exec(`brightnessctl ${args}`));
var screen = await bash`ls -w1 /sys/class/backlight | head -1`;
var kbd = await bash`ls -w1 /sys/class/leds | head -1`;

class Brightness extends Service {
  static {
    Service.register(this, {}, {
      screen: ["float", "rw"],
      kbd: ["int", "rw"]
    });
  }
  #kbdMax = get(`--device ${kbd} max`);
  #kbd = get(`--device ${kbd} get`);
  #screenMax = get(`--device ${screen} max`);
  #screen = get(`--device ${screen} get`) / (get(`--device ${screen} max`) || 1);
  get kbd() {
    return this.#kbd;
  }
  get screen() {
    return this.#screen;
  }
  set kbd(value) {
    if (value < 0 || value > this.#kbdMax)
      return;
    sh(`brightnessctl -d ${kbd} s ${value} -q`).then(() => {
      this.#kbd = value;
      this.changed("kbd");
    });
  }
  set screen(percent) {
    if (percent < 0)
      percent = 0;
    if (percent > 1)
      percent = 1;
    sh(`brightnessctl set ${Math.round(percent * 100)}% -d ${screen} -q`).then(() => {
      this.#screen = percent;
      this.changed("screen");
    });
  }
  constructor() {
    super();
    const screenPath = `/sys/class/backlight/${screen}/brightness`;
    const kbdPath = `/sys/class/leds/${kbd}/brightness`;
    Utils.monitorFile(screenPath, async (f) => {
      const v = await Utils.readFileAsync(f);
      this.#screen = Number(v) / this.#screenMax;
      this.changed("screen");
    });
    Utils.monitorFile(kbdPath, async (f) => {
      const v = await Utils.readFileAsync(f);
      this.#kbd = Number(v) / this.#kbdMax;
      this.changed("kbd");
    });
  }
}
var Brightness_default = new Brightness;

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/energy/brightness/index.ts
var Brightness3 = () => {
  return Widget.Box({
    class_name: "menu-section-container brightness",
    vertical: true,
    children: [
      Widget.Box({
        class_name: "menu-label-container",
        hpack: "fill",
        child: Widget.Label({
          class_name: "menu-label",
          hexpand: true,
          hpack: "start",
          label: "Brightness"
        })
      }),
      Widget.Box({
        class_name: "menu-items-section",
        vpack: "fill",
        vexpand: true,
        vertical: true,
        child: Widget.Box({
          class_name: "brightness-container",
          children: [
            Widget.Icon({
              vexpand: true,
              vpack: "center",
              class_name: "brightness-slider-icon",
              icon: icons_default2.brightness.screen
            }),
            Widget.Slider({
              vpack: "center",
              vexpand: true,
              value: Brightness_default.bind("screen"),
              class_name: "menu-active-slider menu-slider brightness",
              draw_value: false,
              hexpand: true,
              min: 0,
              max: 1,
              onChange: ({ value }) => Brightness_default.screen = value
            }),
            Widget.Label({
              vpack: "center",
              vexpand: true,
              class_name: "brightness-slider-label",
              label: Brightness_default.bind("screen").as((b) => `${Math.round(b * 100)}%`)
            })
          ]
        })
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/energy/index.ts
var energy_default = () => {
  return DropdownMenu_default({
    name: "energymenu",
    transition: "crossfade",
    child: Widget.Box({
      class_name: "menu-items energy",
      hpack: "fill",
      hexpand: true,
      child: Widget.Box({
        vertical: true,
        hpack: "fill",
        hexpand: true,
        class_name: "menu-items-container energy",
        children: [Brightness3(), EnergyProfiles()]
      })
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/dashboard/profile/index.ts
import GdkPixbuf4 from "gi://GdkPixbuf";
var { image: image2, name } = options_default.menus.dashboard.powermenu.avatar;
var { confirmation, shutdown: shutdown2, logout: logout2, sleep: sleep2, reboot: reboot2 } = options_default.menus.dashboard.powermenu;
var Profile = () => {
  const handleClick = (action) => {
    const actions5 = {
      shutdown: shutdown2.value,
      reboot: reboot2.value,
      logout: logout2.value,
      sleep: sleep2.value
    };
    App.closeWindow("dashboardmenu");
    if (!confirmation.value) {
      Utils.execAsync(actions5[action]).catch((err) => console.error(`Failed to execute ${action} command. Error: ${err}`));
    } else {
      actions_default.action(action);
    }
  };
  return Widget.Box({
    class_name: "profiles-container",
    hpack: "fill",
    hexpand: true,
    children: [
      Widget.Box({
        class_name: "profile-picture-container dashboard-card",
        hexpand: true,
        vertical: true,
        children: [
          Widget.Icon({
            hpack: "center",
            class_name: "profile-picture",
            icon: image2.bind("value").as((i) => {
              try {
                GdkPixbuf4.Pixbuf.new_from_file(i);
                return i;
              } catch {
                return "avatar-default-symbolic";
              }
            })
          }),
          Widget.Label({
            hpack: "center",
            class_name: "profile-name",
            label: name.bind("value").as((v) => {
              if (v === "system") {
                return Utils.exec("bash -c whoami");
              }
              return v;
            })
          })
        ]
      }),
      Widget.Box({
        class_name: "power-menu-container dashboard-card",
        vertical: true,
        vexpand: true,
        children: [
          Widget.Button({
            class_name: "dashboard-button shutdown",
            on_clicked: () => handleClick("shutdown"),
            tooltip_text: "Shut Down",
            vexpand: true,
            child: Widget.Icon(icons_default2.powermenu.shutdown)
          }),
          Widget.Button({
            class_name: "dashboard-button restart",
            on_clicked: () => handleClick("reboot"),
            tooltip_text: "Restart",
            vexpand: true,
            child: Widget.Icon(icons_default2.powermenu.reboot)
          }),
          Widget.Button({
            class_name: "dashboard-button lock",
            on_clicked: () => handleClick("logout"),
            tooltip_text: "Log Out",
            vexpand: true,
            child: Widget.Icon(icons_default2.powermenu.logout)
          }),
          Widget.Button({
            class_name: "dashboard-button sleep",
            on_clicked: () => handleClick("sleep"),
            tooltip_text: "Sleep",
            vexpand: true,
            child: Widget.Icon(icons_default2.powermenu.sleep)
          })
        ]
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/dashboard/shortcuts/index.ts
var hyprland6 = await Service.import("hyprland");
var { left, right } = options_default.menus.dashboard.shortcuts;
var Shortcuts = () => {
  const handleClick = (action, tOut = 250) => {
    App.closeWindow("dashboardmenu");
    setTimeout(() => {
      Utils.execAsync(action).then((res) => {
        return res;
      }).catch((err) => err);
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
                on_primary_click: left.shortcut1.command.bind("value").as((cmd) => () => handleClick(cmd)),
                child: Widget.Label({
                  class_name: "button-label txt-icon",
                  label: left.shortcut1.icon.bind("value")
                })
              }),
              Widget.Button({
                tooltip_text: left.shortcut2.tooltip.bind("value"),
                class_name: "dashboard-button",
                on_primary_click: left.shortcut2.command.bind("value").as((cmd) => () => handleClick(cmd)),
                child: Widget.Label({
                  class_name: "button-label txt-icon",
                  label: left.shortcut2.icon.bind("value")
                })
              })
            ]
          }),
          Widget.Box({
            vertical: true,
            hexpand: true,
            children: [
              Widget.Button({
                tooltip_text: left.shortcut3.tooltip.bind("value"),
                class_name: "dashboard-button top-button",
                on_primary_click: left.shortcut3.command.bind("value").as((cmd) => () => handleClick(cmd)),
                child: Widget.Label({
                  hpack: "center",
                  class_name: "button-label txt-icon",
                  label: left.shortcut3.icon.bind("value")
                })
              }),
              Widget.Button({
                tooltip_text: left.shortcut4.tooltip.bind("value"),
                class_name: "dashboard-button",
                on_primary_click: left.shortcut4.command.bind("value").as((cmd) => () => handleClick(cmd)),
                child: Widget.Label({
                  class_name: "button-label txt-icon",
                  label: left.shortcut4.icon.bind("value")
                })
              })
            ]
          })
        ]
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
                on_primary_click: right.shortcut1.command.bind("value").as((cmd) => () => handleClick(cmd)),
                child: Widget.Label({
                  class_name: "button-label txt-icon",
                  label: right.shortcut1.icon.bind("value")
                })
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
                  label: "\uE690"
                })
              })
            ]
          }),
          Widget.Box({
            vertical: true,
            hexpand: true,
            children: [
              Widget.Button({
                tooltip_text: right.shortcut3.tooltip.bind("value"),
                class_name: "dashboard-button top-button",
                on_primary_click: right.shortcut3.command.bind("value").as((cmd) => () => handleClick(cmd)),
                child: Widget.Label({
                  class_name: "button-label txt-icon",
                  label: right.shortcut3.icon.bind("value")
                })
              }),
              Widget.Button({
                tooltip_text: "Start OBS",
                class_name: "dashboard-button",
                on_primary_click: startOBS,
                child: Widget.Label({
                  class_name: "button-label txt-icon",
                  label: "\uDB81\uDC4B"
                })
              })
            ]
          })
        ]
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/dashboard/controls/index.ts
var network5 = await Service.import("network");
var bluetooth4 = await Service.import("bluetooth");
var notifications2 = await Service.import("notifications");
var audio7 = await Service.import("audio");
var Controls3 = () => {
  return Widget.Box({
    class_name: "dashboard-card controls-container",
    hpack: "fill",
    vpack: "fill",
    expand: true,
    children: [
      Widget.Button({
        tooltip_text: "Toggle Wifi",
        expand: true,
        setup: (self) => {
          self.hook(network5, () => {
            return self.class_name = `dashboard-button wifi ${!network5.wifi.enabled ? "disabled" : ""}`;
          });
        },
        on_primary_click: () => network5.toggleWifi(),
        child: Widget.Label({
          class_name: "txt-icon",
          setup: (self) => {
            self.hook(network5, () => {
              return self.label = network5.wifi.enabled ? "\uDB82\uDD28" : "\uDB82\uDD2D";
            });
          }
        })
      }),
      Widget.Button({
        tooltip_text: "Toggle Bluetooth",
        expand: true,
        class_name: bluetooth4.bind("enabled").as((btOn) => `dashboard-button bluetooth ${!btOn ? "disabled" : ""}`),
        on_primary_click: () => bluetooth4.toggle(),
        child: Widget.Label({
          class_name: "txt-icon",
          label: bluetooth4.bind("enabled").as((btOn) => btOn ? "\uDB80\uDCAF" : "\uDB80\uDCB2")
        })
      }),
      Widget.Button({
        tooltip_text: "Toggle Notifications",
        expand: true,
        class_name: notifications2.bind("dnd").as((dnd) => `dashboard-button notifications ${dnd ? "disabled" : ""}`),
        on_primary_click: () => notifications2.dnd = !notifications2.dnd,
        child: Widget.Label({
          class_name: "txt-icon",
          label: notifications2.bind("dnd").as((dnd) => dnd ? "\uDB80\uDC9B" : "\uDB80\uDC9A")
        })
      }),
      Widget.Button({
        tooltip_text: "Toggle Mute (Playback)",
        expand: true,
        on_primary_click: () => audio7.speaker.is_muted = !audio7.speaker.is_muted,
        setup: (self) => {
          self.hook(audio7, () => {
            return self.class_name = `dashboard-button playback ${audio7.speaker.is_muted ? "disabled" : ""}`;
          });
        },
        child: Widget.Label({
          class_name: "txt-icon",
          setup: (self) => {
            self.hook(audio7, () => {
              return self.label = audio7.speaker.is_muted ? "\uDB81\uDD81" : "\uDB81\uDD7E";
            });
          }
        })
      }),
      Widget.Button({
        tooltip_text: "Toggle Mute (Microphone)",
        expand: true,
        on_primary_click: () => audio7.microphone.is_muted = !audio7.microphone.is_muted,
        setup: (self) => {
          self.hook(audio7, () => {
            return self.class_name = `dashboard-button input ${audio7.microphone.is_muted ? "disabled" : ""}`;
          });
        },
        child: Widget.Label({
          class_name: "txt-icon",
          setup: (self) => {
            self.hook(audio7, () => {
              return self.label = audio7.microphone.is_muted ? "\uDB80\uDF6D" : "\uDB80\uDF6C";
            });
          }
        })
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/dashboard/stats/index.ts
var { terminal } = options_default;
var { enable_gpu } = options_default.menus.dashboard.stats;
var Stats = () => {
  const divide = ([total, free]) => free / total;
  const formatSizeInGB = (sizeInKB) => Number((sizeInKB / 1024 ** 2).toFixed(2));
  const cpu = Variable(0, {
    poll: [
      2000,
      "top -b -n 1",
      (out) => {
        if (typeof out !== "string") {
          return 0;
        }
        const cpuOut = out.split("\n").find((line) => line.includes("Cpu(s)"));
        if (cpuOut === undefined) {
          return 0;
        }
        return divide([100, cpuOut.split(/\s+/)[1].replace(",", ".")]);
      }
    ]
  });
  const ram = Variable({ total: 0, used: 0, percentage: 0 }, {
    poll: [
      2000,
      "free",
      (out) => {
        if (typeof out !== "string") {
          return { total: 0, used: 0, percentage: 0 };
        }
        const ramOut = out.split("\n").find((line) => line.includes("Mem:"));
        if (ramOut === undefined) {
          return { total: 0, used: 0, percentage: 0 };
        }
        const [totalRam, usedRam] = ramOut.split(/\s+/).splice(1, 2).map(Number);
        return {
          percentage: divide([totalRam, usedRam]),
          total: formatSizeInGB(totalRam),
          used: formatSizeInGB(usedRam)
        };
      }
    ]
  });
  const gpu = Variable(0);
  const GPUStat = Widget.Box({
    child: enable_gpu.bind("value").as((gpStat) => {
      if (!gpStat || !dependencies("gpustat")) {
        return Widget.Box();
      }
      return Widget.Box({
        vertical: true,
        children: [
          Widget.Box({
            class_name: "stat gpu",
            hexpand: true,
            vpack: "center",
            setup: (self) => {
              const getGpuUsage = () => {
                if (!enable_gpu.value) {
                  gpu.value = 0;
                  return;
                }
                Utils.execAsync("gpustat --json").then((out) => {
                  if (typeof out !== "string") {
                    return 0;
                  }
                  try {
                    const data = JSON.parse(out);
                    const totalGpu = 100;
                    const usedGpu = data.gpus.reduce((acc, gpu2) => {
                      return acc + gpu2["utilization.gpu"];
                    }, 0) / data.gpus.length;
                    gpu.value = divide([totalGpu, usedGpu]);
                  } catch (e) {
                    console.error("Error getting GPU stats:", e);
                    gpu.value = 0;
                  }
                }).catch((err) => {
                  console.error(`An error occurred while fetching GPU stats: ${err}`);
                });
              };
              self.poll(2000, getGpuUsage);
              Utils.merge([gpu.bind("value"), enable_gpu.bind("value")], (gpu2, enableGpu) => {
                if (!enableGpu) {
                  return self.children = [];
                }
                return self.children = [
                  Widget.Button({
                    on_primary_click: terminal.bind("value").as((term) => {
                      return () => {
                        App.closeWindow("dashboardmenu");
                        Utils.execAsync(`bash -c "${term} -e btop"`).catch((err) => `Failed to open btop: ${err}`);
                      };
                    }),
                    child: Widget.Label({
                      class_name: "txt-icon",
                      label: "\uDB82\uDCAE"
                    })
                  }),
                  Widget.Button({
                    on_primary_click: terminal.bind("value").as((term) => {
                      return () => {
                        App.closeWindow("dashboardmenu");
                        Utils.execAsync(`bash -c "${term} -e btop"`).catch((err) => `Failed to open btop: ${err}`);
                      };
                    }),
                    child: Widget.LevelBar({
                      class_name: "stats-bar",
                      hexpand: true,
                      vpack: "center",
                      value: gpu2
                    })
                  })
                ];
              });
            }
          }),
          Widget.Box({
            hpack: "end",
            children: Utils.merge([gpu.bind("value"), enable_gpu.bind("value")], (gpuUsed, enableGpu) => {
              if (!enableGpu) {
                return [];
              }
              return [
                Widget.Label({
                  class_name: "stat-value gpu",
                  label: `${Math.floor(gpuUsed * 100)}%`
                })
              ];
            })
          })
        ]
      });
    })
  });
  const storage = Variable({ total: 0, used: 0, percentage: 0 }, {
    poll: [
      2000,
      "df -B1 /",
      (out) => {
        if (typeof out !== "string") {
          return { total: 0, used: 0, percentage: 0 };
        }
        const dfOut = out.split("\n").find((line) => line.startsWith("/"));
        if (dfOut === undefined) {
          return { total: 0, used: 0, percentage: 0 };
        }
        const parts = dfOut.split(/\s+/);
        const size = parseInt(parts[1], 10);
        const used = parseInt(parts[2], 10);
        const sizeInGB = formatSizeInGB(size);
        const usedInGB = formatSizeInGB(used);
        return {
          total: Math.floor(sizeInGB / 1000),
          used: Math.floor(usedInGB / 1000),
          percentage: divide([size, used])
        };
      }
    ]
  });
  const homeStorage = Variable({ total: 0, used: 0, percentage: 0 }, {
    poll: [
      2000,
      "df -B1 /home",
      (out) => {
        if (typeof out !== "string") {
          return { total: 0, used: 0, percentage: 0 };
        }
        const dfOut = out.split("\n").find((line) => line.includes("/home"));
        if (dfOut === undefined) {
          return { total: 0, used: 0, percentage: 0 };
        }
        const parts = dfOut.split(/\s+/);
        const size = parseInt(parts[1], 10);
        const used = parseInt(parts[2], 10);
        const sizeInGB = formatSizeInGB(size);
        const usedInGB = formatSizeInGB(used);
        return {
          total: Math.floor(sizeInGB / 1000),
          used: Math.floor(usedInGB / 1000),
          percentage: divide([size, used])
        };
      }
    ]
  });
  return Widget.Box({
    class_name: "dashboard-card stats-container",
    vertical: true,
    vpack: "fill",
    hpack: "fill",
    expand: true,
    children: [
      Widget.Box({
        vertical: true,
        children: [
          Widget.Box({
            class_name: "stat cpu",
            hexpand: true,
            vpack: "center",
            children: [
              Widget.Button({
                on_primary_click: terminal.bind("value").as((term) => {
                  return () => {
                  };
                }),
                child: Widget.Label({
                  class_name: "txt-icon",
                  label: "\uF4BC"
                })
              }),
              Widget.Button({
                on_primary_click: terminal.bind("value").as((term) => {
                  return () => {
                  };
                }),
                child: Widget.LevelBar({
                  class_name: "stats-bar",
                  hexpand: true,
                  vpack: "center",
                  bar_mode: "continuous",
                  max_value: 1,
                  value: cpu.bind("value")
                })
              })
            ]
          }),
          Widget.Label({
            hpack: "end",
            class_name: "stat-value cpu",
            label: cpu.bind("value").as((v) => `${Math.floor(v * 100)}%`)
          })
        ]
      }),
      Widget.Box({
        vertical: true,
        children: [
          Widget.Box({
            class_name: "stat ram",
            vpack: "center",
            hexpand: true,
            children: [
              Widget.Button({
                on_primary_click: terminal.bind("value").as((term) => {
                  return () => {
                  };
                }),
                child: Widget.Label({
                  class_name: "txt-icon",
                  label: "\uEFC5"
                })
              }),
              Widget.Button({
                on_primary_click: terminal.bind("value").as((term) => {
                  return () => {
                  };
                }),
                child: Widget.LevelBar({
                  class_name: "stats-bar",
                  hexpand: true,
                  vpack: "center",
                  value: ram.bind("value").as((v) => v.percentage)
                })
              })
            ]
          }),
          Widget.Label({
            hpack: "end",
            class_name: "stat-value ram",
            label: ram.bind("value").as((v) => `${v.used}/${v.total} GB`)
          })
        ]
      }),
      GPUStat,
      Widget.Box({
        vertical: true,
        children: [
          Widget.Box({
            class_name: "stat storage",
            hexpand: true,
            vpack: "center",
            children: [
              Widget.Button({
                on_primary_click: terminal.bind("value").as((term) => {
                  return () => {
                  };
                }),
                child: Widget.Label({
                  class_name: "txt-icon",
                  label: "\uDB80\uDECA"
                })
              }),
              Widget.Button({
                on_primary_click: terminal.bind("value").as((term) => {
                  return () => {
                  };
                }),
                child: Widget.LevelBar({
                  class_name: "stats-bar",
                  hexpand: true,
                  vpack: "center",
                  value: storage.bind("value").as((v) => v.percentage)
                })
              })
            ]
          }),
          Widget.Label({
            hpack: "end",
            class_name: "stat-value storage",
            label: storage.bind("value").as((v) => `${v.used}/${v.total} GB`)
          })
        ]
      }),
      Widget.Box({
        vertical: true,
        children: [
          Widget.Box({
            class_name: "stat storage",
            hexpand: true,
            vpack: "center",
            children: [
              Widget.Button({
                on_primary_click: terminal.bind("value").as((term) => {
                  return () => {
                  };
                }),
                child: Widget.Label({
                  class_name: "txt-icon",
                  label: "\uDB80\uDECA"
                })
              }),
              Widget.Button({
                on_primary_click: terminal.bind("value").as((term) => {
                  return () => {
                  };
                }),
                child: Widget.LevelBar({
                  class_name: "stats-bar",
                  hexpand: true,
                  vpack: "center",
                  value: homeStorage.bind("value").as((v) => v.percentage)
                })
              })
            ]
          }),
          Widget.Label({
            hpack: "end",
            class_name: "stat-value storage",
            label: homeStorage.bind("value").as((v) => `${v.used}/${v.total} GB`)
          })
        ]
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/dashboard/directories/index.ts
var { left: left2, right: right2 } = options_default.menus.dashboard.directories;
var Directories = () => {
  return Widget.Box({
    class_name: "dashboard-card directories-container",
    vpack: "fill",
    hpack: "fill",
    expand: true,
    children: [
      Widget.Box({
        vertical: true,
        expand: true,
        class_name: "section right",
        children: [
          Widget.Button({
            hpack: "start",
            expand: true,
            class_name: "directory-link left top",
            on_primary_click: left2.directory1.command.bind("value").as((cmd) => {
              return () => {
                App.closeWindow("dashboardmenu");
                Utils.execAsync(cmd);
              };
            }),
            child: Widget.Label({
              hpack: "start",
              label: left2.directory1.label.bind("value")
            })
          }),
          Widget.Button({
            expand: true,
            hpack: "start",
            class_name: "directory-link left middle",
            on_primary_click: left2.directory2.command.bind("value").as((cmd) => {
              return () => {
                App.closeWindow("dashboardmenu");
                Utils.execAsync(cmd);
              };
            }),
            child: Widget.Label({
              hpack: "start",
              label: left2.directory2.label.bind("value")
            })
          }),
          Widget.Button({
            expand: true,
            hpack: "start",
            class_name: "directory-link left bottom",
            on_primary_click: left2.directory3.command.bind("value").as((cmd) => {
              return () => {
                App.closeWindow("dashboardmenu");
                Utils.execAsync(cmd);
              };
            }),
            child: Widget.Label({
              hpack: "start",
              label: left2.directory3.label.bind("value")
            })
          })
        ]
      }),
      Widget.Box({
        vertical: true,
        expand: true,
        class_name: "section left",
        children: [
          Widget.Button({
            hpack: "start",
            expand: true,
            class_name: "directory-link right top",
            on_primary_click: right2.directory1.command.bind("value").as((cmd) => {
              return () => {
                App.closeWindow("dashboardmenu");
                Utils.execAsync(cmd);
              };
            }),
            child: Widget.Label({
              hpack: "start",
              label: right2.directory1.label.bind("value")
            })
          }),
          Widget.Button({
            expand: true,
            hpack: "start",
            class_name: "directory-link right middle",
            on_primary_click: right2.directory2.command.bind("value").as((cmd) => {
              return () => {
                App.closeWindow("dashboardmenu");
                Utils.execAsync(cmd);
              };
            }),
            child: Widget.Label({
              hpack: "start",
              label: right2.directory2.label.bind("value")
            })
          }),
          Widget.Button({
            expand: true,
            hpack: "start",
            class_name: "directory-link right bottom",
            on_primary_click: right2.directory3.command.bind("value").as((cmd) => {
              return () => {
                App.closeWindow("dashboardmenu");
                Utils.execAsync(cmd);
              };
            }),
            child: Widget.Label({
              hpack: "start",
              label: right2.directory3.label.bind("value")
            })
          })
        ]
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/dashboard/index.ts
var dashboard_default = () => {
  return DropdownMenu_default({
    name: "dashboardmenu",
    transition: "crossfade",
    child: Widget.Box({
      class_name: "dashboard-menu-content",
      css: "padding: 1px; margin: -1px;",
      vexpand: false,
      children: [
        Widget.Box({
          class_name: "dashboard-content-container",
          vertical: true,
          children: [
            Widget.Box({
              class_name: "dashboard-content-items",
              vertical: true,
              children: [
                Profile(),
                Shortcuts(),
                Controls3(),
                Directories(),
                Stats()
              ]
            })
          ]
        })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/menus/main.ts
var main_default = [
  power_default(),
  verification_default(),
  audio_default(),
  network_default(),
  bluetooth_default(),
  media_default(),
  notifications_default(),
  calendar_default(),
  energy_default(),
  dashboard_default()
];

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/RegularWindow.ts
import Gtk from "gi://Gtk?version=3.0";
var RegularWindow_default = Widget.subclass(Gtk.Window);

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/shared/Label.ts
var Label = (name2, sub = "", subtitleLink = "") => {
  const subTitle = () => {
    if (subtitleLink.length) {
      return Widget.Button({
        hpack: "start",
        vpack: "center",
        class_name: "options-sublabel-link",
        label: sub,
        on_primary_click: () => Utils.execAsync(`bash -c 'xdg-open ${subtitleLink}'`)
      });
    }
    return Widget.Label({
      hpack: "start",
      vpack: "center",
      class_name: "options-sublabel",
      label: sub
    });
  };
  return Widget.Box({
    vertical: true,
    hpack: "start",
    children: [
      Widget.Label({
        hpack: "start",
        vpack: "center",
        class_name: "options-label",
        label: name2
      }),
      subTitle()
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/shared/Inputter.ts
import Gdk5 from "gi://Gdk";

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/shared/FileChooser.ts
import Gtk2 from "gi://Gtk?version=3.0";
import Gio4 from "gi://Gio";
var saveFileDialog = (filePath, themeOnly) => {
  const original_file_path = filePath;
  let file = Gio4.File.new_for_path(original_file_path);
  let [success, content] = file.load_contents(null);
  if (!success) {
    console.error(`Could not find 'config.json' at ${TMP}`);
    return;
  }
  let jsonString = new TextDecoder("utf-8").decode(content);
  let jsonObject = JSON.parse(jsonString);
  const filterHexColorPairs = (jsonObject2) => {
    const hexColorPattern = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
    let filteredObject = {};
    for (let key in jsonObject2) {
      if (typeof jsonObject2[key] === "string" && hexColorPattern.test(jsonObject2[key])) {
        filteredObject[key] = jsonObject2[key];
      }
    }
    return filteredObject;
  };
  const filterOutHexColorPairs = (jsonObject2) => {
    const hexColorPattern = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
    let filteredObject = {};
    for (let key in jsonObject2) {
      if (!(typeof jsonObject2[key] === "string" && hexColorPattern.test(jsonObject2[key]))) {
        filteredObject[key] = jsonObject2[key];
      }
    }
    return filteredObject;
  };
  let filteredJsonObject = themeOnly ? filterHexColorPairs(jsonObject) : filterOutHexColorPairs(jsonObject);
  let filteredContent = JSON.stringify(filteredJsonObject, null, 2);
  let dialog = new Gtk2.FileChooserDialog({
    title: "Save File As",
    action: Gtk2.FileChooserAction.SAVE
  });
  dialog.add_button(Gtk2.STOCK_CANCEL, Gtk2.ResponseType.CANCEL);
  dialog.add_button(Gtk2.STOCK_SAVE, Gtk2.ResponseType.ACCEPT);
  dialog.set_current_name(themeOnly ? "hyprpanel_theme.json" : "hyprpanel_config.json");
  let response = dialog.run();
  if (response === Gtk2.ResponseType.ACCEPT) {
    let file_path = dialog.get_filename();
    console.info(`Original file path: ${file_path}`);
    const getIncrementedFilePath = (filePath2) => {
      let increment = 1;
      let baseName = filePath2.replace(/(\.\w+)$/, "");
      let match = filePath2.match(/(\.\w+)$/);
      let extension = match ? match[0] : "";
      let newFilePath = filePath2;
      let file2 = Gio4.File.new_for_path(newFilePath);
      while (file2.query_exists(null)) {
        newFilePath = `${baseName}_${increment}${extension}`;
        file2 = Gio4.File.new_for_path(newFilePath);
        increment++;
      }
      return newFilePath;
    };
    let finalFilePath = getIncrementedFilePath(file_path);
    console.info(`File will be saved at: ${finalFilePath}`);
    try {
      let save_file = Gio4.File.new_for_path(finalFilePath);
      let outputStream = save_file.replace(null, false, Gio4.FileCreateFlags.NONE, null);
      let dataOutputStream = new Gio4.DataOutputStream({
        base_stream: outputStream
      });
      dataOutputStream.put_string(filteredContent, null);
      dataOutputStream.close(null);
      Notify({
        summary: "File Saved Successfully",
        body: `At ${finalFilePath}.`,
        iconName: icons_default.ui.info,
        timeout: 5000
      });
    } catch (e) {
      console.error("Failed to write to file:", e.message);
    }
  }
  dialog.destroy();
};
var importFiles = (themeOnly = false) => {
  let dialog = new Gtk2.FileChooserDialog({
    title: `Import ${themeOnly ? "Theme" : "Config"}`,
    action: Gtk2.FileChooserAction.OPEN
  });
  dialog.add_button(Gtk2.STOCK_CANCEL, Gtk2.ResponseType.CANCEL);
  dialog.add_button(Gtk2.STOCK_OPEN, Gtk2.ResponseType.ACCEPT);
  let response = dialog.run();
  if (response === Gtk2.ResponseType.CANCEL) {
    dialog.destroy();
    return;
  }
  if (response === Gtk2.ResponseType.ACCEPT) {
    let filePath = dialog.get_filename();
    let file = Gio4.File.new_for_path(filePath);
    let [success, content] = file.load_contents(null);
    if (!success) {
      console.error(`Failed to import: ${filePath}`);
      dialog.destroy();
      return;
    }
    Notify({
      summary: `Importing ${themeOnly ? "Theme" : "Config"}`,
      body: `Importing: ${filePath}`,
      iconName: icons_default.ui.info,
      timeout: 7000
    });
    let jsonString = new TextDecoder("utf-8").decode(content);
    let importedConfig = JSON.parse(jsonString);
    const hexColorPattern = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
    const saveConfigToFile = (config, filePath2) => {
      let file2 = Gio4.File.new_for_path(filePath2);
      let outputStream = file2.replace(null, false, Gio4.FileCreateFlags.NONE, null);
      let dataOutputStream = new Gio4.DataOutputStream({ base_stream: outputStream });
      let jsonString2 = JSON.stringify(config, null, 2);
      dataOutputStream.put_string(jsonString2, null);
      dataOutputStream.close(null);
    };
    const filterConfigForThemeOnly = (config) => {
      let filteredConfig = {};
      for (let key in config) {
        if (typeof config[key] === "string" && hexColorPattern.test(config[key])) {
          filteredConfig[key] = config[key];
        }
      }
      return filteredConfig;
    };
    const filterConfigForNonTheme = (config) => {
      let filteredConfig = {};
      for (let key in config) {
        if (!(typeof config[key] === "string" && hexColorPattern.test(config[key]))) {
          filteredConfig[key] = config[key];
        }
      }
      return filteredConfig;
    };
    let tmpConfigFile = Gio4.File.new_for_path(`${TMP}/config.json`);
    let optionsConfigFile = Gio4.File.new_for_path(OPTIONS);
    let [tmpSuccess, tmpContent] = tmpConfigFile.load_contents(null);
    let [optionsSuccess, optionsContent] = optionsConfigFile.load_contents(null);
    if (!tmpSuccess || !optionsSuccess) {
      console.error("Failed to read existing configuration files.");
      dialog.destroy();
      return;
    }
    let tmpConfig = JSON.parse(new TextDecoder("utf-8").decode(tmpContent));
    let optionsConfig = JSON.parse(new TextDecoder("utf-8").decode(optionsContent));
    if (themeOnly) {
      const filteredConfig = filterConfigForThemeOnly(importedConfig);
      tmpConfig = { ...tmpConfig, ...filteredConfig };
      optionsConfig = { ...optionsConfig, ...filteredConfig };
    } else {
      const filteredConfig = filterConfigForNonTheme(importedConfig);
      tmpConfig = { ...tmpConfig, ...filteredConfig };
      optionsConfig = { ...optionsConfig, ...filteredConfig };
    }
    saveConfigToFile(tmpConfig, `${TMP}/config.json`);
    saveConfigToFile(optionsConfig, OPTIONS);
  }
  dialog.destroy();
  bash("pkill ags && ags");
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/shared/Inputter.ts
var EnumSetter = (opt2, values) => {
  const lbl = Widget.Label({ label: opt2.bind().as((v) => `${v}`) });
  const step = (dir) => {
    const i = values.findIndex((i2) => i2 === lbl.label);
    opt2.setValue(dir > 0 ? i + dir > values.length - 1 ? values[0] : values[i + dir] : i + dir < 0 ? values[values.length - 1] : values[i + dir]);
  };
  const next = Widget.Button({
    child: Widget.Icon(icons_default.ui.arrow.right),
    on_clicked: () => step(1)
  });
  const prev = Widget.Button({
    child: Widget.Icon(icons_default.ui.arrow.left),
    on_clicked: () => step(-1)
  });
  return Widget.Box({
    class_name: "enum-setter",
    children: [lbl, prev, next]
  });
};
var Inputter = ({
  opt: opt2,
  type = typeof opt2.value,
  enums,
  max = 1e6,
  min = 0,
  increment = 1,
  disabledBinding,
  dependencies: dependencies2,
  exportData
}, className, isUnsaved) => {
  return Widget.Box({
    vpack: "center",
    class_name: /export|import/.test(type || "") ? "" : "inputter-container",
    setup: (self) => {
      switch (type) {
        case "number":
          return self.children = [
            Widget.Box({
              class_name: "unsaved-icon-container",
              child: isUnsaved.bind("value").as((unsvd) => {
                if (unsvd) {
                  return Widget.Icon({
                    class_name: "unsaved-icon",
                    icon: icons_default.ui.warning,
                    tooltipText: "Press 'Enter' to apply your changes."
                  });
                }
                return Widget.Box();
              })
            }),
            Widget.SpinButton({
              setup(self2) {
                self2.set_range(min, max);
                self2.set_increments(1 * increment, 5 * increment);
                self2.on("value-changed", () => {
                  opt2.value = self2.value;
                });
                self2.hook(opt2, () => {
                  self2.value = opt2.value;
                  isUnsaved.value = Number(self2.text) !== opt2.value;
                });
                self2.connect("key-release-event", () => {
                  isUnsaved.value = Number(self2.text) !== opt2.value;
                });
              }
            })
          ];
        case "float":
        case "object":
          return self.children = [
            Widget.Box({
              class_name: "unsaved-icon-container",
              child: isUnsaved.bind("value").as((unsvd) => {
                if (unsvd) {
                  return Widget.Icon({
                    class_name: "unsaved-icon",
                    icon: icons_default.ui.warning,
                    tooltipText: "Press 'Enter' to apply your changes."
                  });
                }
                return Widget.Box();
              })
            }),
            Widget.Entry({
              class_name: className,
              on_change: (self2) => isUnsaved.value = self2.text !== JSON.stringify(opt2.value),
              on_accept: (self2) => opt2.value = JSON.parse(self2.text || ""),
              setup: (self2) => self2.hook(opt2, () => {
                self2.text = JSON.stringify(opt2.value);
                isUnsaved.value = self2.text !== JSON.stringify(opt2.value);
              })
            })
          ];
        case "string":
          return self.children = [
            Widget.Box({
              class_name: "unsaved-icon-container",
              child: isUnsaved.bind("value").as((unsvd) => {
                if (unsvd) {
                  return Widget.Icon({
                    class_name: "unsaved-icon",
                    icon: icons_default.ui.warning,
                    tooltipText: "Press 'Enter' to apply your changes."
                  });
                }
                return Widget.Box();
              })
            }),
            Widget.Entry({
              class_name: isUnsaved.bind("value").as((unsaved) => unsaved ? "unsaved" : ""),
              on_change: (self2) => isUnsaved.value = self2.text !== opt2.value,
              on_accept: (self2) => {
                opt2.value = self2.text;
              },
              setup: (self2) => self2.hook(opt2, () => {
                isUnsaved.value = self2.text !== opt2.value;
                self2.text = opt2.value;
              })
            })
          ];
        case "enum":
          return self.child = EnumSetter(opt2, enums);
        case "boolean":
          return self.child = Widget.Switch({
            sensitive: disabledBinding !== undefined ? disabledBinding.bind("value").as((disabled) => !disabled) : true
          }).on("notify::active", (self2) => {
            if (disabledBinding !== undefined && disabledBinding.value) {
              return;
            }
            if (self2.active && dependencies2 !== undefined && !dependencies2.every((d) => dependencies(d))) {
              self2.active = false;
              return;
            }
            opt2.value = self2.active;
          }).hook(opt2, (self2) => {
            self2.active = opt2.value;
          });
        case "img":
          return self.child = Widget.FileChooserButton({
            class_name: "image-chooser",
            on_file_set: ({ uri }) => {
              opt2.value = uri.replace("file://", "");
            }
          });
        case "config_import":
          return self.child = Widget.Box({
            children: [
              Widget.Button({
                class_name: "options-import",
                label: "import",
                on_clicked: () => {
                  importFiles(exportData?.themeOnly);
                }
              }),
              Widget.Button({
                class_name: "options-export",
                label: "export",
                on_clicked: () => {
                  saveFileDialog(exportData?.filePath, exportData?.themeOnly);
                }
              })
            ]
          });
        case "wallpaper":
          return self.child = Widget.FileChooserButton({
            on_file_set: ({ uri }) => {
              opt2.value = uri.replace("file://", "");
              if (options_default.wallpaper.enable.value) {
                Wallpaper_default.set(uri.replace("file://", ""));
              }
            }
          });
        case "font":
          return self.child = Widget.FontButton({
            show_size: false,
            use_size: false,
            setup: (self2) => self2.hook(opt2, () => self2.font = opt2.value).on("font-set", ({ font }) => opt2.value = font.split(" ").slice(0, -1).join(" "))
          });
        case "color":
          return self.child = Widget.ColorButton().hook(opt2, (self2) => {
            const rgba = new Gdk5.RGBA;
            rgba.parse(opt2.value);
            self2.rgba = rgba;
          }).on("color-set", ({ rgba: { red, green, blue } }) => {
            const hex = (n) => {
              const c = Math.floor(255 * n).toString(16);
              return c.length === 1 ? `0${c}` : c;
            };
            opt2.value = `#${hex(red)}${hex(green)}${hex(blue)}`;
          });
        default:
          return self.child = Widget.Label({
            label: `no setter with type ${type}`
          });
      }
    }
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/shared/Option.ts
var Option = (props, className = "") => {
  const isUnsaved = Variable(false);
  return Widget.Box({
    class_name: "option-item",
    hexpand: true,
    children: [
      Widget.Box({
        hpack: "start",
        vpack: "center",
        hexpand: true,
        child: Label(props.title, props.subtitle || "", props.subtitleLink)
      }),
      Inputter(props, className, isUnsaved),
      Widget.Button({
        vpack: "center",
        class_name: "reset-options",
        child: Widget.Icon(icons_default.ui.refresh),
        on_clicked: () => props.opt.reset(),
        sensitive: props.opt.bind().as((v) => v !== props.opt.initial)
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/shared/Header.ts
var Header2 = (headerName) => {
  return Widget.Box({
    class_name: "options-header",
    children: [
      Widget.Label({
        class_name: "label-name",
        label: headerName
      }),
      Widget.Separator({
        vpack: "center",
        hexpand: true,
        class_name: "menu-separator"
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/bar/index.ts
var BarTheme = () => {
  return Widget.Scrollable({
    vscroll: "always",
    hscroll: "automatic",
    class_name: "bar-theme-page paged-container",
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("General"),
        Option({ opt: options_default.theme.bar.transparent, title: "Transparent", type: "boolean" }),
        Option({ opt: options_default.theme.bar.background, title: "Background Color", type: "color" }),
        Option({ opt: options_default.theme.bar.opacity, title: "Background Opacity", type: "number", increment: 5, min: 0, max: 100 }),
        Option({ opt: options_default.theme.bar.buttons.opacity, title: "Button Opacity", type: "number", increment: 5, min: 0, max: 100 }),
        Option({ opt: options_default.theme.bar.buttons.monochrome, title: "Use Global Colors", type: "boolean", disabledBinding: options_default.theme.matugen }),
        Option({ opt: options_default.theme.bar.buttons.background, title: "Button Background", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.hover, title: "Button Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.text, title: "Button Text", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.icon, title: "Button Icon", type: "color" }),
        Header2("Dashboard Button"),
        Option({ opt: options_default.theme.bar.buttons.dashboard.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.dashboard.hover, title: "Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.dashboard.icon, title: "Icon", type: "color" }),
        Header2("Workspaces"),
        Option({ opt: options_default.theme.bar.buttons.workspaces.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.workspaces.available, title: "Workspace Available Color", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.workspaces.occupied, title: "Workspace Occupied Color", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.workspaces.active, title: "Workspace Active Color", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.workspaces.numbered_active_highlighted_text_color, title: "Highlighted Workspace Text Color", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.workspaces.numbered_active_underline_color, title: "Workspace Underline Color", type: "color" }),
        Header2("Window Title"),
        Option({ opt: options_default.theme.bar.buttons.windowtitle.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.windowtitle.hover, title: "Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.windowtitle.text, title: "Text", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.windowtitle.icon, title: "Icon", type: "color" }),
        Header2("Media"),
        Option({ opt: options_default.theme.bar.buttons.media.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.media.hover, title: "Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.media.text, title: "Text", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.media.icon, title: "Icon", type: "color" }),
        Header2("Volume"),
        Option({ opt: options_default.theme.bar.buttons.volume.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.volume.hover, title: "Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.volume.text, title: "Text", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.volume.icon, title: "Icon", type: "color" }),
        Header2("Network"),
        Option({ opt: options_default.theme.bar.buttons.network.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.network.hover, title: "Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.network.text, title: "Text", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.network.icon, title: "Icon", type: "color" }),
        Header2("Bluetooth"),
        Option({ opt: options_default.theme.bar.buttons.bluetooth.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.bluetooth.hover, title: "Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.bluetooth.text, title: "Text", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.bluetooth.icon, title: "Icon", type: "color" }),
        Header2("System Tray"),
        Option({ opt: options_default.theme.bar.buttons.systray.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.systray.hover, title: "Hover", type: "color" }),
        Header2("Battery"),
        Option({ opt: options_default.theme.bar.buttons.battery.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.battery.hover, title: "Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.battery.text, title: "Text", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.battery.icon, title: "Icon", type: "color" }),
        Header2("Clock"),
        Option({ opt: options_default.theme.bar.buttons.clock.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.clock.hover, title: "Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.clock.text, title: "Text", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.clock.icon, title: "Icon", type: "color" }),
        Header2("Notifications"),
        Option({ opt: options_default.theme.bar.buttons.notifications.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.notifications.hover, title: "Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.notifications.total, title: "Notification Count", type: "color" }),
        Option({ opt: options_default.theme.bar.buttons.notifications.icon, title: "Icon", type: "color" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/notifications/index.ts
var NotificationsTheme = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    hscroll: "automatic",
    class_name: "notifications-theme-page paged-container",
    vexpand: true,
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("Notifications Theme Settings"),
        Option({ opt: options_default.theme.notification.background, title: "Notification Background", type: "color" }),
        Option({ opt: options_default.theme.notification.opacity, title: "Notification Opacity", type: "number", increment: 5, min: 0, max: 100 }),
        Option({ opt: options_default.theme.notification.actions.background, title: "Action Button Background", subtitle: "Buttons that perform actions within a notification", type: "color" }),
        Option({ opt: options_default.theme.notification.actions.text, title: "Action Button Text Color", type: "color" }),
        Option({ opt: options_default.theme.notification.label, title: "Label", type: "color" }),
        Option({ opt: options_default.theme.notification.border, title: "Border", type: "color" }),
        Option({ opt: options_default.theme.notification.time, title: "Time Stamp", type: "color" }),
        Option({ opt: options_default.theme.notification.text, title: "Body Text", type: "color" }),
        Option({ opt: options_default.theme.notification.labelicon, title: "Label Icon", subtitle: "Icon that accompanies the label. Doesn\'t apply if icon is an app icon.", type: "color" }),
        Option({ opt: options_default.theme.notification.close_button.background, title: "Dismiss Button", type: "color" }),
        Option({ opt: options_default.theme.notification.close_button.label, title: "Dismiss Button Text", type: "color" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/menus/battery.ts
var BatteryMenuTheme = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    hscroll: "automatic",
    class_name: "menu-theme-page battery paged-container",
    vexpand: true,
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("Battery Menu Theme Settings"),
        Option({ opt: options_default.theme.bar.menus.menu.battery.text, title: "Text", type: "color" }),
        Header2("Card"),
        Option({ opt: options_default.theme.bar.menus.menu.battery.card.color, title: "Card", type: "color" }),
        Header2("Background"),
        Option({ opt: options_default.theme.bar.menus.menu.battery.background.color, title: "Background", type: "color" }),
        Header2("Border"),
        Option({ opt: options_default.theme.bar.menus.menu.battery.border.color, title: "Border", type: "color" }),
        Header2("Label"),
        Option({ opt: options_default.theme.bar.menus.menu.battery.label.color, title: "Label", type: "color" }),
        Header2("List Items"),
        Option({ opt: options_default.theme.bar.menus.menu.battery.listitems.active, title: "Active/Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.battery.listitems.passive, title: "Passive", type: "color" }),
        Header2("Icons"),
        Option({ opt: options_default.theme.bar.menus.menu.battery.icons.active, title: "Active", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.battery.icons.passive, title: "Passive", type: "color" }),
        Header2("Slider"),
        Option({ opt: options_default.theme.bar.menus.menu.battery.slider.primary, title: "Primary", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.battery.slider.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.battery.slider.backgroundhover, title: "Background (Hover)", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.battery.slider.puck, title: "Puck", type: "color" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/menus/bluetooth.ts
var BluetoothMenuTheme = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    hscroll: "automatic",
    class_name: "menu-theme-page bluetooth paged-container",
    vexpand: true,
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("Bluetooth Menu Theme Settings"),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.text, title: "Text", type: "color" }),
        Header2("Card"),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.card.color, title: "Card", type: "color" }),
        Header2("Background"),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.background.color, title: "Background", type: "color" }),
        Header2("Border"),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.border.color, title: "Border", type: "color" }),
        Header2("Label"),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.label.color, title: "Label", type: "color" }),
        Header2("Status"),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.status, title: "Connection Status", type: "color" }),
        Header2("List Items"),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.listitems.active, title: "Active/Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.listitems.passive, title: "Passive", type: "color" }),
        Header2("Icons"),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.icons.active, title: "Active", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.icons.passive, title: "Passive", type: "color" }),
        Header2("Icon Buttons"),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.iconbutton.active, title: "Active", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.iconbutton.passive, title: "Passive", type: "color" }),
        Header2("Switch"),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.switch.enabled, title: "Enabled", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.switch.disabled, title: "Disabled", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.switch.puck, title: "Puck", type: "color" }),
        Header2("Switch Divider"),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.switch_divider, title: "Switch Divider", type: "color" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/menus/clock.ts
var ClockMenuTheme = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    hscroll: "automatic",
    class_name: "menu-theme-page clock paged-container",
    vexpand: true,
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("Clock Menu Theme Settings"),
        Option({ opt: options_default.theme.bar.menus.menu.clock.text, title: "Text", type: "color" }),
        Header2("Card"),
        Option({ opt: options_default.theme.bar.menus.menu.clock.card.color, title: "Card", type: "color" }),
        Header2("Background"),
        Option({ opt: options_default.theme.bar.menus.menu.clock.background.color, title: "Background", type: "color" }),
        Header2("Border"),
        Option({ opt: options_default.theme.bar.menus.menu.clock.border.color, title: "Border", type: "color" }),
        Header2("Time"),
        Option({ opt: options_default.theme.bar.menus.menu.clock.time.time, title: "Time", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.time.timeperiod, title: "Period", subtitle: "AM/PM", type: "color" }),
        Header2("Calendar"),
        Option({ opt: options_default.theme.bar.menus.menu.clock.calendar.yearmonth, title: "Year/Month", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.calendar.weekdays, title: "Weekdays", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.calendar.paginator, title: "Navigation Arrows (Hover)", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.calendar.currentday, title: "Current Day", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.calendar.days, title: "Days", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.calendar.contextdays, title: "Trailing/Leading Days", type: "color" }),
        Header2("Weather"),
        Option({ opt: options_default.theme.bar.menus.menu.clock.weather.icon, title: "Current Weather Icon", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.weather.temperature, title: "Current Temperature", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.weather.status, title: "Current Status", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.weather.stats, title: "Current Stats", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.weather.thermometer.extremelyhot, title: "Thermometer - Extremely Hot", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.weather.thermometer.hot, title: "Thermometer - Hot", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.weather.thermometer.moderate, title: "Thermometer - Moderate", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.weather.thermometer.cold, title: "Thermometer - Cold", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.weather.thermometer.extremelycold, title: "Thermometer - Extremely Cold", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.weather.hourly.time, title: "Hourly Weather Time", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.weather.hourly.icon, title: "Hourly Weather Icon", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.weather.hourly.temperature, title: "Hourly Weather Temperature", type: "color" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/menus/dashboard.ts
var DashboardMenuTheme = () => {
  return Widget.Scrollable({
    vscroll: "always",
    hscroll: "automatic",
    class_name: "menu-theme-page dashboard paged-container",
    vexpand: true,
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("Card"),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.card.color, title: "Card", type: "color" }),
        Header2("Background"),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.background.color, title: "Background", type: "color" }),
        Header2("Border"),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.border.color, title: "Border", type: "color" }),
        Header2("Profile"),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.profile.name, title: "Profile Name", type: "color" }),
        Header2("Power Menu"),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.powermenu.shutdown, title: "Shutdown", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.powermenu.restart, title: "Restart", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.powermenu.logout, title: "Log Out", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.powermenu.sleep, title: "Sleep", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.powermenu.confirmation.card, title: "Confirmation Dialog Card", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.powermenu.confirmation.background, title: "Confirmation Dialog Background", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.powermenu.confirmation.border, title: "Confirmation Dialog Border", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.powermenu.confirmation.label, title: "Confirmation Dialog Label", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.powermenu.confirmation.body, title: "Confirmation Dialog Description", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.powermenu.confirmation.confirm, title: "Confirmation Dialog Confirm Button", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.powermenu.confirmation.deny, title: "Confirmation Dialog Cancel Button", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.powermenu.confirmation.button_text, title: "Confirmation Dialog Button Text", type: "color" }),
        Header2("Shortcuts"),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.shortcuts.background, title: "Primary", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.shortcuts.text, title: "Text", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.shortcuts.recording, title: "Recording", subtitle: "Color of the Record button when recording is in progress", type: "color" }),
        Header2("Controls"),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.controls.disabled, title: "Module Off", subtitle: "Button color when element is disabled", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.controls.wifi.background, title: "Wifi Button", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.controls.wifi.text, title: "Wifi Button Text", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.controls.bluetooth.background, title: "Bluetooth Button", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.controls.bluetooth.text, title: "Bluetooth Button Text", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.controls.notifications.background, title: "Notifications Button", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.controls.notifications.text, title: "Notifications Button Text", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.controls.volume.background, title: "Volume Button", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.controls.volume.text, title: "Volume Button Text", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.controls.input.background, title: "Input Button", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.controls.input.text, title: "Input Button Text", type: "color" }),
        Header2("Directories"),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.directories.left.top.color, title: "Directory: Left - Top", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.directories.left.middle.color, title: "Directory: Left - Middle", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.directories.left.bottom.color, title: "Directory: Left - Bottom", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.directories.right.top.color, title: "Directory: Right - Top", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.directories.right.middle.color, title: "Directory: Right - Middle", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.directories.right.bottom.color, title: "Directory: Right - Bottom", type: "color" }),
        Header2("System Stats"),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.monitors.bar_background, title: "Bar Background", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.monitors.cpu.icon, title: "CPU Icon", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.monitors.cpu.bar, title: "CPU Bar", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.monitors.cpu.label, title: "CPU Label", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.monitors.ram.icon, title: "RAM Icon", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.monitors.ram.bar, title: "RAM Bar", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.monitors.ram.label, title: "RAM Label", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.monitors.gpu.icon, title: "GPU Icon", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.monitors.gpu.bar, title: "GPU Bar", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.monitors.gpu.label, title: "GPU Label", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.monitors.disk.icon, title: "Disk Icon", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.monitors.disk.bar, title: "Disk Bar", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.monitors.disk.label, title: "Disk Label", type: "color" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/menus/index.ts
var MenuTheme = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    hscroll: "automatic",
    class_name: "menu-theme-page paged-container",
    vexpand: true,
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("General"),
        Option({
          opt: options_default.dummy,
          title: "Theme",
          subtitle: "WARNING: Importing a theme will replace your current theme color settings.",
          type: "config_import",
          exportData: {
            filePath: OPTIONS,
            themeOnly: true
          }
        }),
        Option({ opt: options_default.theme.bar.menus.monochrome, title: "Use Global Colors", type: "boolean", disabledBinding: options_default.theme.matugen }),
        Option({ opt: options_default.wallpaper.enable, title: "Apply Wallpapers", subtitle: "Whether to apply the wallpaper or to only use it for Matugen color generation.", type: "boolean" }),
        Option({ opt: options_default.wallpaper.image, title: "Wallpaper", subtitle: options_default.wallpaper.image.bind("value"), type: "wallpaper" }),
        Option({ opt: options_default.theme.bar.menus.background, title: "Background Color", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.opacity, title: "Menu Opacity", type: "number", increment: 5, min: 0, max: 100 }),
        Option({ opt: options_default.theme.bar.menus.cards, title: "Cards", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.card_radius, title: "Card Radius", type: "string" }),
        Option({ opt: options_default.theme.bar.menus.text, title: "Primary Text", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.dimtext, title: "Dim Text", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.feinttext, title: "Feint Text", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.label, title: "Label Color", type: "color" }),
        Header2("Border"),
        Option({ opt: options_default.theme.bar.menus.border.size, title: "Border Width", type: "string" }),
        Option({ opt: options_default.theme.bar.menus.border.radius, title: "Border Radius", type: "string" }),
        Option({ opt: options_default.theme.bar.menus.border.color, title: "Border Color", type: "color" }),
        Header2("Popover"),
        Option({ opt: options_default.theme.bar.menus.popover.text, title: "Text", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.popover.background, title: "Background", type: "color" }),
        Header2("List Items"),
        Option({ opt: options_default.theme.bar.menus.listitems.active, title: "Active", subtitle: "Items of a list (network name, bluetooth device name, playback device, etc.) when active or hovered.", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.listitems.passive, title: "Passive", type: "color" }),
        Header2("Icons"),
        Option({ opt: options_default.theme.bar.menus.icons.active, title: "Active", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.icons.passive, title: "Passive", type: "color" }),
        Header2("Switch"),
        Option({ opt: options_default.theme.bar.menus.switch.enabled, title: "Enabled", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.switch.disabled, title: "Disabled", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.switch.puck, title: "Puck", type: "color" }),
        Header2("Check/Radio Buttons"),
        Option({ opt: options_default.theme.bar.menus.check_radio_button.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.check_radio_button.active, title: "Active", type: "color" }),
        Header2("Buttons"),
        Option({ opt: options_default.theme.bar.menus.buttons.default, title: "Primary", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.buttons.active, title: "Active", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.buttons.disabled, title: "Disabled", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.buttons.text, title: "Text", type: "color" }),
        Header2("Icon Buttons"),
        Option({ opt: options_default.theme.bar.menus.iconbuttons.passive, title: "Primary", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.iconbuttons.active, title: "Active/Hovered", type: "color" }),
        Header2("Progress Bar"),
        Option({ opt: options_default.theme.bar.menus.progressbar.foreground, title: "Primary", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.progressbar.background, title: "Background", type: "color" }),
        Header2("Slider"),
        Option({ opt: options_default.theme.bar.menus.slider.primary, title: "Primary", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.slider.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.slider.backgroundhover, title: "Background (Hover)", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.slider.puck, title: "Puck", type: "color" }),
        Header2("Dropdown Menu"),
        Option({ opt: options_default.theme.bar.menus.dropdownmenu.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.dropdownmenu.text, title: "Text", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.dropdownmenu.divider, title: "Divider", type: "color" }),
        Header2("Tooltips"),
        Option({ opt: options_default.theme.bar.menus.tooltip.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.tooltip.text, title: "Text", type: "color" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/menus/media.ts
var MediaMenuTheme = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    hscroll: "automatic",
    class_name: "menu-theme-page media paged-container",
    vexpand: true,
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("Media Menu Theme Settings"),
        Option({ opt: options_default.theme.bar.menus.menu.media.song, title: "Song", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.media.artist, title: "Artist", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.media.album, title: "Album", type: "color" }),
        Header2("Background"),
        Option({ opt: options_default.theme.bar.menus.menu.media.background.color, title: "Background", type: "color" }),
        Header2("Border"),
        Option({ opt: options_default.theme.bar.menus.menu.media.border.color, title: "Border", type: "color" }),
        Header2("Card/Album Art"),
        Option({ opt: options_default.theme.bar.menus.menu.media.card.color, title: "Color", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.media.card.tint, title: "Tint", type: "number", increment: 5, min: 0, max: 100 }),
        Header2("Buttons"),
        Option({ opt: options_default.theme.bar.menus.menu.media.buttons.inactive, title: "Unavailable", subtitle: "Disabled button when media control isn\'t available.", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.media.buttons.enabled, title: "Enabled", subtitle: "Ex: Button color when shuffle/loop is enabled.", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.media.buttons.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.media.buttons.text, title: "Text", type: "color" }),
        Header2("Slider"),
        Option({ opt: options_default.theme.bar.menus.menu.media.slider.primary, title: "Primary Color", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.media.slider.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.media.slider.backgroundhover, title: "Backround (Hover)", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.media.slider.puck, title: "Puck", type: "color" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/menus/network.ts
var NetworkMenuTheme = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    hscroll: "automatic",
    class_name: "menu-theme-page network paged-container",
    vexpand: true,
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("Network Menu Theme Settings"),
        Option({ opt: options_default.theme.bar.menus.menu.network.text, title: "Text", type: "color" }),
        Header2("Card"),
        Option({ opt: options_default.theme.bar.menus.menu.network.card.color, title: "Card", type: "color" }),
        Header2("Background"),
        Option({ opt: options_default.theme.bar.menus.menu.network.background.color, title: "Background", type: "color" }),
        Header2("Border"),
        Option({ opt: options_default.theme.bar.menus.menu.network.border.color, title: "Border", type: "color" }),
        Header2("Label"),
        Option({ opt: options_default.theme.bar.menus.menu.network.label.color, title: "Label", type: "color" }),
        Header2("Status"),
        Option({ opt: options_default.theme.bar.menus.menu.network.status.color, title: "Connection Status", type: "color" }),
        Header2("List Items"),
        Option({ opt: options_default.theme.bar.menus.menu.network.listitems.active, title: "Active/Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.network.listitems.passive, title: "Passive", type: "color" }),
        Header2("Icons"),
        Option({ opt: options_default.theme.bar.menus.menu.network.icons.active, title: "Active", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.network.icons.passive, title: "Passive", type: "color" }),
        Header2("Icon Buttons"),
        Option({ opt: options_default.theme.bar.menus.menu.network.iconbuttons.active, title: "Active", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.network.iconbuttons.passive, title: "Passive", type: "color" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/menus/notifications.ts
var NotificationsMenuTheme = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    hscroll: "automatic",
    class_name: "menu-theme-page notifications paged-container",
    vexpand: true,
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("Notifications Menu Theme Settings"),
        Option({ opt: options_default.theme.bar.menus.menu.notifications.label, title: "Menu Label", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.notifications.card, title: "Card", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.notifications.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.notifications.no_notifications_label, title: "Empty Notifications Backdrop", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.notifications.border, title: "Border", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.notifications.switch_divider, title: "Switch Divider", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.notifications.clear, title: "Clear Notifications Button", type: "color" }),
        Header2("Switch"),
        Option({ opt: options_default.theme.bar.menus.menu.notifications.switch.enabled, title: "Enabled", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.notifications.switch.disabled, title: "Disabled", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.notifications.switch.puck, title: "Puck", type: "color" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/menus/systray.ts
var SystrayMenuTheme = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    hscroll: "automatic",
    class_name: "menu-theme-page systray paged-container",
    vexpand: true,
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("Dropdown Menu"),
        Option({ opt: options_default.theme.bar.menus.menu.systray.dropdownmenu.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.systray.dropdownmenu.text, title: "Text", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.systray.dropdownmenu.divider, title: "Section Divider", type: "color" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/menus/volume.ts
var VolumeMenuTheme = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    hscroll: "automatic",
    class_name: "menu-theme-page volume paged-container",
    vexpand: true,
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("Volume Menu Theme Settings"),
        Option({ opt: options_default.theme.bar.menus.menu.volume.text, title: "Text", type: "color" }),
        Header2("Card"),
        Option({ opt: options_default.theme.bar.menus.menu.volume.card.color, title: "Card", type: "color" }),
        Header2("Background"),
        Option({ opt: options_default.theme.bar.menus.menu.volume.background.color, title: "Background", type: "color" }),
        Header2("Border"),
        Option({ opt: options_default.theme.bar.menus.menu.volume.border.color, title: "Border", type: "color" }),
        Header2("Label"),
        Option({ opt: options_default.theme.bar.menus.menu.volume.label.color, title: "Label", type: "color" }),
        Header2("List Items"),
        Option({ opt: options_default.theme.bar.menus.menu.volume.listitems.active, title: "Active/Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.volume.listitems.passive, title: "Passive", type: "color" }),
        Header2("Icon Button"),
        Option({ opt: options_default.theme.bar.menus.menu.volume.iconbutton.active, title: "Active/Hover", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.volume.iconbutton.passive, title: "Passive", type: "color" }),
        Header2("Icons"),
        Option({ opt: options_default.theme.bar.menus.menu.volume.icons.active, title: "Active", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.volume.icons.passive, title: "Passive", type: "color" }),
        Header2("Audio Slider"),
        Option({ opt: options_default.theme.bar.menus.menu.volume.audio_slider.primary, title: "Primary", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.volume.audio_slider.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.volume.audio_slider.backgroundhover, title: "Background (Hover)", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.volume.audio_slider.puck, title: "Puck", type: "color" }),
        Header2("Input Slider"),
        Option({ opt: options_default.theme.bar.menus.menu.volume.input_slider.primary, title: "Primary", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.volume.input_slider.background, title: "Background", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.volume.input_slider.backgroundhover, title: "Background (Hover)", type: "color" }),
        Option({ opt: options_default.theme.bar.menus.menu.volume.input_slider.puck, title: "Puck", type: "color" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/osd/index.ts
var OsdTheme = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    hscroll: "automatic",
    class_name: "osd-theme-page paged-container",
    vexpand: true,
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("On Screen Display Settings"),
        Option({ opt: options_default.theme.osd.opacity, title: "OSD Opacity", type: "number", increment: 5, min: 0, max: 100 }),
        Option({ opt: options_default.theme.osd.bar_color, title: "Bar", type: "color" }),
        Option({ opt: options_default.theme.osd.bar_overflow_color, title: "Bar Overflow", subtitle: "Overflow color is for when the volume goes over a 100", type: "color" }),
        Option({ opt: options_default.theme.osd.bar_empty_color, title: "Bar Background", type: "color" }),
        Option({ opt: options_default.theme.osd.bar_container, title: "Bar Container", type: "color" }),
        Option({ opt: options_default.theme.osd.icon, title: "Icon", type: "color" }),
        Option({ opt: options_default.theme.osd.icon_container, title: "Icon Container", type: "color" }),
        Option({ opt: options_default.theme.osd.label, title: "Value Text", type: "color" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/menus/matugen.ts
var Matugen = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    hscroll: "automatic",
    class_name: "menu-theme-page paged-container",
    vexpand: true,
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("Matugen Settings"),
        Option({ opt: options_default.theme.matugen, title: "Enable Matugen", subtitle: "WARNING: THIS WILL REPLACE YOUR CURRENT COLOR SCHEME!!!", type: "boolean", dependencies: ["matugen", "swww"] }),
        Option({ opt: options_default.theme.matugen_settings.mode, title: "Matugen Theme", type: "enum", enums: ["light", "dark"] }),
        Option({
          opt: options_default.theme.matugen_settings.scheme_type,
          title: "Matugen Scheme",
          type: "enum",
          enums: [
            "content",
            "expressive",
            "fidelity",
            "fruit-salad",
            "monochrome",
            "neutral",
            "rainbow",
            "tonal-spot"
          ]
        }),
        Option({
          opt: options_default.theme.matugen_settings.variation,
          title: "Matugen Variation",
          type: "enum",
          enums: [
            "standard_1",
            "standard_2",
            "standard_3",
            "monochrome_1",
            "monochrome_2",
            "monochrome_3",
            "vivid_1",
            "vivid_2",
            "vivid_3"
          ]
        }),
        Option({ opt: options_default.theme.matugen_settings.contrast, title: "Contrast", subtitle: "Range: -1 to 1 (Default: 0)", type: "float" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/theme/index.ts
var CurrentPage = Variable("General Settings");
var pagerMap = [
  "General Settings",
  "Matugen Settings",
  "Bar",
  "Notifications",
  "OSD",
  "Battery Menu",
  "Bluetooth Menu",
  "Clock Menu",
  "Dashboard Menu",
  "Media Menu",
  "Network Menu",
  "Notifications Menu",
  "System Tray",
  "Volume Menu"
];
var ThemesMenu = () => {
  return Widget.Box({
    vertical: true,
    children: CurrentPage.bind("value").as((v) => {
      return [
        Widget.Box({
          class_name: "option-pages-container",
          hpack: "center",
          hexpand: true,
          vertical: true,
          children: [0, 1, 2].map((section) => {
            return Widget.Box({
              children: pagerMap.map((page, index) => {
                if (index >= section * 5 && index < section * 5 + 5) {
                  return Widget.Button({
                    hpack: "center",
                    xalign: 0,
                    class_name: `pager-button ${v === page ? "active" : ""}`,
                    label: page,
                    on_primary_click: () => CurrentPage.value = page
                  });
                }
                return Widget.Box();
              })
            });
          })
        }),
        Widget.Stack({
          vexpand: true,
          class_name: "themes-menu-stack",
          children: {
            "General Settings": MenuTheme(),
            "Matugen Settings": Matugen(),
            Bar: BarTheme(),
            Notifications: NotificationsTheme(),
            OSD: OsdTheme(),
            "Battery Menu": BatteryMenuTheme(),
            "Bluetooth Menu": BluetoothMenuTheme(),
            "Clock Menu": ClockMenuTheme(),
            "Dashboard Menu": DashboardMenuTheme(),
            "Media Menu": MediaMenuTheme(),
            "Network Menu": NetworkMenuTheme(),
            "Notifications Menu": NotificationsMenuTheme(),
            "System Tray": SystrayMenuTheme(),
            "Volume Menu": VolumeMenuTheme()
          },
          shown: CurrentPage.bind("value")
        })
      ];
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/config/general/index.ts
var BarGeneral = () => {
  return Widget.Scrollable({
    class_name: "bar-theme-page paged-container",
    vscroll: "automatic",
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("General Settings"),
        Option({ opt: options_default.theme.font.name, title: "Font", type: "font" }),
        Option({ opt: options_default.theme.font.size, title: "Font Size", type: "string" }),
        Option({ opt: options_default.theme.font.weight, title: "Font Weight", subtitle: "100, 200, 300, etc.", type: "number", increment: 100, min: 100, max: 900 }),
        Option({
          opt: options_default.dummy,
          title: "Config",
          subtitle: "WARNING: Importing a configuration will replace your current configuration settings.",
          type: "config_import",
          exportData: {
            filePath: OPTIONS,
            themeOnly: false
          }
        }),
        Option({ opt: options_default.terminal, title: "Terminal", subtitle: "Tools such as 'btop' will open in this terminal", type: "string" }),
        Header2("Scaling"),
        Option({ opt: options_default.theme.bar.scaling, title: "Bar", type: "number", min: 1, max: 100, increment: 5 }),
        Option({ opt: options_default.theme.notification.scaling, title: "Notifications", type: "number", min: 1, max: 100, increment: 5 }),
        Option({ opt: options_default.theme.osd.scaling, title: "OSD", type: "number", min: 1, max: 100, increment: 5 }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.scaling, title: "Dashboard Menu", type: "number", min: 1, max: 100, increment: 5 }),
        Option({ opt: options_default.theme.bar.menus.menu.dashboard.confirmation_scaling, title: "Confirmation Dialog", type: "number", min: 1, max: 100, increment: 5 }),
        Option({ opt: options_default.theme.bar.menus.menu.media.scaling, title: "Media Menu", type: "number", min: 1, max: 100, increment: 5 }),
        Option({ opt: options_default.theme.bar.menus.menu.volume.scaling, title: "Volume Menu", type: "number", min: 1, max: 100, increment: 5 }),
        Option({ opt: options_default.theme.bar.menus.menu.network.scaling, title: "Network Menu", type: "number", min: 1, max: 100, increment: 5 }),
        Option({ opt: options_default.theme.bar.menus.menu.bluetooth.scaling, title: "Bluetooth Menu", type: "number", min: 1, max: 100, increment: 5 }),
        Option({ opt: options_default.theme.bar.menus.menu.battery.scaling, title: "Battery Menu", type: "number", min: 1, max: 100, increment: 5 }),
        Option({ opt: options_default.theme.bar.menus.menu.clock.scaling, title: "Clock Menu", type: "number", min: 1, max: 100, increment: 5 }),
        Option({ opt: options_default.theme.bar.menus.menu.notifications.scaling, title: "Notifications Menu", type: "number", min: 1, max: 100, increment: 5 })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/config/bar/index.ts
var BarSettings = () => {
  return Widget.Scrollable({
    vscroll: "always",
    hscroll: "automatic",
    class_name: "menu-theme-page paged-container",
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("Layouts"),
        Option({ opt: options_default.bar.layouts, title: "Bar Layouts for Monitors", subtitle: "Wiki Link: https://hyprpanel.com/configuration/panel.html#layouts", type: "object", subtitleLink: "https://hyprpanel.com/configuration/panel.html#layouts" }, "bar-layout-input"),
        Header2("Spacing"),
        Option({ opt: options_default.theme.bar.outer_spacing, title: "Outer Spacing", subtitle: "Spacing on the outer left and right edges of the bar.", type: "string" }),
        Option({ opt: options_default.theme.bar.buttons.y_margins, title: "Vertical Margins", subtitle: "Spacing above/below the buttons in the bar.", type: "string" }),
        Option({ opt: options_default.theme.bar.buttons.spacing, title: "Button Spacing", subtitle: "Spacing between the buttons in the bar.", type: "string" }),
        Option({ opt: options_default.theme.bar.buttons.radius, title: "Button Radius", type: "string" }),
        Option({ opt: options_default.theme.bar.floating, title: "Floating Bar", type: "boolean" }),
        Option({ opt: options_default.theme.bar.layer, title: "Layer", type: "enum", subtitle: "Layer determines the Z index of your bar.", enums: ["top", "bottom", "overlay", "background"] }),
        Option({ opt: options_default.theme.bar.margin_top, title: "Margin Top", subtitle: "Only applies if floating is enabled", type: "string" }),
        Option({ opt: options_default.theme.bar.margin_bottom, title: "Margin Bottom", subtitle: "Only applies if floating is enabled", type: "string" }),
        Option({ opt: options_default.theme.bar.margin_sides, title: "Margin Sides", subtitle: "Only applies if floating is enabled", type: "string" }),
        Option({ opt: options_default.theme.bar.border_radius, title: "Border Radius", subtitle: "Only applies if floating is enabled", type: "string" }),
        Header2("Dashboard"),
        Option({ opt: options_default.bar.launcher.icon, title: "Dashboard Menu Icon", type: "string" }),
        Header2("Workspaces"),
        Option({ opt: options_default.bar.workspaces.show_icons, title: "Show Workspace Icons", type: "boolean" }),
        Option({ opt: options_default.bar.workspaces.icons.available, title: "Workspace Available", type: "string" }),
        Option({ opt: options_default.bar.workspaces.icons.active, title: "Workspace Active", type: "string" }),
        Option({ opt: options_default.bar.workspaces.icons.occupied, title: "Workspace Occupied", type: "string" }),
        Option({ opt: options_default.bar.workspaces.show_numbered, title: "Show Workspace Numbers", type: "boolean" }),
        Option({ opt: options_default.bar.workspaces.numbered_active_indicator, title: "Numbered Workspace Identifier", subtitle: "Only applicable if Workspace Numbers are enabled", type: "enum", enums: ["underline", "highlight", "color"] }),
        Option({ opt: options_default.theme.bar.buttons.workspaces.numbered_active_highlight_border, title: "Highlight Radius", subtitle: "Only applicable if Workspace Numbers are enabled", type: "string" }),
        Option({ opt: options_default.theme.bar.buttons.workspaces.numbered_active_highlight_padding, title: "Highlight Padding", subtitle: "Only applicable if Workspace Numbers are enabled", type: "string" }),
        Option({ opt: options_default.bar.workspaces.spacing, title: "Spacing", subtitle: "Spacing between workspace icons", type: "float" }),
        Option({ opt: options_default.bar.workspaces.workspaces, title: "Total Workspaces", type: "number" }),
        Option({ opt: options_default.bar.workspaces.monitorSpecific, title: "Monitor Specific", subtitle: "Only workspaces applicable to the monitor will be displayed", type: "boolean" }),
        Option({ opt: options_default.bar.workspaces.workspaceMask, title: "Mask Workspace Numbers On Monitors", subtitle: "Only applicable if Workspace Numbers and Monitor Specific are enabled.\nForces each Monitor\'s Workspace labels to start from 1.", type: "boolean" }),
        Option({ opt: options_default.bar.workspaces.reverse_scroll, title: "Invert Scroll", subtitle: "Scrolling up will go to the previous workspace rather than the next.", type: "boolean" }),
        Option({ opt: options_default.bar.workspaces.scroll_speed, title: "Scrolling Speed", type: "number" }),
        Header2("Window Titles"),
        Option({ opt: options_default.theme.bar.buttons.windowtitle.spacing, title: "Inner Spacing", subtitle: "Spacing between the icon and the label inside the buttons.", type: "string" }),
        Option({ opt: options_default.bar.windowtitle.title_map, title: "Window Title Mappings", subtitle: "Wiki Link: https://hyprpanel.com/configuration/panel.html#window-title-mappings", type: "object", subtitleLink: "https://hyprpanel.com/configuration/panel.html#window-title-mappings" }),
        Header2("Volume"),
        Option({ opt: options_default.bar.volume.label, title: "Show Volume Percentage", type: "boolean" }),
        Option({ opt: options_default.theme.bar.buttons.volume.spacing, title: "Inner Spacing", subtitle: "Spacing between the icon and the label inside the buttons.", type: "string" }),
        Header2("Network"),
        Option({ opt: options_default.bar.network.label, title: "Show Network Name", type: "boolean" }),
        Option({ opt: options_default.bar.network.truncation, title: "Truncate Network Name", subtitle: "Will truncate the network name to the specified size below.", type: "boolean" }),
        Option({ opt: options_default.bar.network.truncation_size, title: "Truncation Size", type: "number" }),
        Option({ opt: options_default.theme.bar.buttons.network.spacing, title: "Inner Spacing", subtitle: "Spacing between the icon and the label inside the buttons.", type: "string" }),
        Header2("Bluetooth"),
        Option({ opt: options_default.bar.bluetooth.label, title: "Show Bluetooth Label", type: "boolean" }),
        Option({ opt: options_default.theme.bar.buttons.bluetooth.spacing, title: "Inner Spacing", subtitle: "Spacing between the icon and the label inside the buttons.", type: "string" }),
        Header2("Battery"),
        Option({ opt: options_default.bar.battery.label, title: "Show Battery Percentage", type: "boolean" }),
        Option({ opt: options_default.theme.bar.buttons.battery.spacing, title: "Inner Spacing", subtitle: "Spacing between the icon and the label inside the buttons.", type: "string" }),
        Header2("Clock"),
        Option({ opt: options_default.bar.clock.format, title: "Clock Format", type: "string" }),
        Header2("Media"),
        Option({ opt: options_default.theme.bar.buttons.media.spacing, title: "Inner Spacing", subtitle: "Spacing between the icon and the label inside the buttons.", type: "string" }),
        Option({ opt: options_default.bar.media.show_artist, title: "Show Track Artist", type: "boolean" }),
        Option({ opt: options_default.bar.media.show_label, title: "Toggle Media Label", type: "boolean" }),
        Option({ opt: options_default.bar.media.truncation, title: "Truncate Media Label", subtitle: "Only applicable if Toggle Media Label is enabled", type: "boolean" }),
        Option({ opt: options_default.bar.media.truncation_size, title: "Truncation Size", subtitle: "Only applicable if Toggle Media Label is enabled", type: "number", min: 10 }),
        Header2("Notifications"),
        Option({ opt: options_default.bar.notifications.show_total, title: "Show Total # of notifications", type: "boolean" }),
        Option({ opt: options_default.theme.bar.buttons.notifications.spacing, title: "Inner Spacing", subtitle: "Spacing between the icon and the label inside the buttons.", type: "string" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/config/menus/clock.ts
var ClockMenuSettings = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    child: Widget.Box({
      class_name: "bar-theme-page paged-container",
      vertical: true,
      children: [
        Header2("Time"),
        Option({ opt: options_default.menus.clock.time.military, title: "Use 24hr time", type: "boolean" }),
        Header2("Weather"),
        Option({ opt: options_default.menus.clock.weather.location, title: "Location", subtitle: "Zip Code, Postal Code, City, etc.", type: "string" }),
        Option({ opt: options_default.menus.clock.weather.key, title: "Weather API Key", subtitle: "May require AGS restart. https://weatherapi.com/", type: "string" }),
        Option({ opt: options_default.menus.clock.weather.unit, title: "Units", type: "enum", enums: ["imperial", "metric"] }),
        Option({ opt: options_default.menus.clock.weather.interval, title: "Weather Fetching Interval (ms)", subtitle: "May require AGS restart.", type: "number" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/config/menus/dashboard.ts
var DashboardMenuSettings = () => {
  return Widget.Scrollable({
    class_name: "bar-theme-page paged-container",
    vscroll: "always",
    hscroll: "automatic",
    vexpand: true,
    overlayScrolling: true,
    child: Widget.Box({
      vertical: true,
      children: [
        Header2("Power Menu"),
        Option({ opt: options_default.menus.dashboard.powermenu.avatar.image, title: "Profile Image", type: "img" }),
        Option({ opt: options_default.menus.dashboard.powermenu.avatar.name, title: "Profile Name", subtitle: "Use \'system\' to automatically set system name", type: "string" }),
        Option({ opt: options_default.menus.dashboard.powermenu.confirmation, title: "Show Confirmation Dialogue", type: "boolean" }),
        Option({ opt: options_default.menus.dashboard.powermenu.shutdown, title: "Shutdown Command", type: "string" }),
        Option({ opt: options_default.menus.dashboard.powermenu.reboot, title: "Reboot Command", type: "string" }),
        Option({ opt: options_default.menus.dashboard.powermenu.logout, title: "Logout Command", type: "string" }),
        Option({ opt: options_default.menus.dashboard.powermenu.sleep, title: "Sleep Command", type: "string" }),
        Header2("Resource Usage Metrics"),
        Option({ opt: options_default.menus.dashboard.stats.enable_gpu, title: "Track GPU", subtitle: "NOTE: This is currently only available for NVidia GPUs and requires \'python-gpustat\'.", type: "boolean" }),
        Header2("Shortcuts"),
        Option({ opt: options_default.menus.dashboard.shortcuts.left.shortcut1.icon, title: "Left - Shortcut 1 (Icon)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.left.shortcut1.command, title: "Left - Shortcut 1 (Command)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.left.shortcut1.tooltip, title: "Left - Shortcut 1 (Tooltip)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.left.shortcut2.icon, title: "Left - Shortcut 2 (Icon)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.left.shortcut2.command, title: "Left - Shortcut 2 (Command)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.left.shortcut2.tooltip, title: "Left - Shortcut 2 (Tooltip)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.left.shortcut3.icon, title: "Left - Shortcut 3 (Icon)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.left.shortcut3.command, title: "Left - Shortcut 3 (Command)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.left.shortcut3.tooltip, title: "Left - Shortcut 3 (Tooltip)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.left.shortcut4.icon, title: "Left - Shortcut 4 (Icon)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.left.shortcut4.command, title: "Left - Shortcut 4 (Command)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.left.shortcut4.tooltip, title: "Left - Shortcut 4 (Tooltip)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.right.shortcut1.icon, title: "Right - Shortcut 1 (Icon)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.right.shortcut1.command, title: "Right - Shortcut 1 (Command)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.right.shortcut1.tooltip, title: "Right - Shortcut 1 (Tooltip)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.right.shortcut3.icon, title: "Right - Shortcut 3 (Icon)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.right.shortcut3.command, title: "Right - Shortcut 3 (Command)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.shortcuts.right.shortcut3.tooltip, title: "Right - Shortcut 3 (Tooltip)", type: "string" }),
        Header2("Directories"),
        Option({ opt: options_default.menus.dashboard.directories.left.directory1.label, title: "Left - Directory 1 (Label)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.directories.left.directory1.command, title: "Left - Directory 1 (Command)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.directories.left.directory2.label, title: "Left - Directory 2 (Label)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.directories.left.directory2.command, title: "Left - Directory 2 (Command)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.directories.left.directory3.label, title: "Left - Directory 3 (Label)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.directories.left.directory3.command, title: "Left - Directory 3 (Command)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.directories.right.directory1.label, title: "Right - Directory 1 (Label)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.directories.right.directory1.command, title: "Right - Directory 1 (Command)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.directories.right.directory2.label, title: "Right - Directory 2 (Label)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.directories.right.directory2.command, title: "Right - Directory 2 (Command)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.directories.right.directory3.label, title: "Right - Directory 3 (Label)", type: "string" }),
        Option({ opt: options_default.menus.dashboard.directories.right.directory3.command, title: "Right - Directory 3 (Command)", type: "string" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/config/notifications/index.ts
var NotificationSettings = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    child: Widget.Box({
      class_name: "bar-theme-page paged-container",
      vertical: true,
      children: [
        Header2("Notification Settings"),
        Option({ opt: options_default.notifications.position, title: "Notification Location", type: "enum", enums: ["top left", "top", "top right", "right", "bottom right", "bottom", "bottom left", "left"] }),
        Option({ opt: options_default.notifications.monitor, title: "Monitor", subtitle: "The ID of the monitor on which to display the notification", type: "number" }),
        Option({ opt: options_default.notifications.active_monitor, title: "Follow Cursor", subtitle: "The notification will follow the monitor of your cursor", type: "boolean" }),
        Option({ opt: options_default.notifications.timeout, title: "Notification Timeout", subtitle: "How long notification popups will last (in milliseconds).", type: "number" }),
        Option({ opt: options_default.notifications.cache_actions, title: "Preserve Actions", subtitle: "This will persist the action buttons of a notification after rebooting.", type: "boolean" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/config/osd/index.ts
var OSDSettings = () => {
  return Widget.Scrollable({
    vscroll: "automatic",
    child: Widget.Box({
      class_name: "bar-theme-page paged-container",
      vertical: true,
      children: [
        Header2("On Screen Display"),
        Option({ opt: options_default.theme.osd.enable, title: "Enabled", type: "boolean" }),
        Option({ opt: options_default.theme.osd.orientation, title: "Orientation", type: "enum", enums: ["horizontal", "vertical"] }),
        Option({ opt: options_default.theme.osd.location, title: "Position", subtitle: "Position of the OSD on the screen", type: "enum", enums: ["top left", "top", "top right", "right", "bottom right", "bottom", "bottom left", "left"] }),
        Option({ opt: options_default.theme.osd.monitor, title: "Monitor", subtitle: "The ID of the monitor on which to display the OSD", type: "number" }),
        Option({ opt: options_default.theme.osd.active_monitor, title: "Follow Cursor", subtitle: "The OSD will follow the monitor of your cursor", type: "boolean" }),
        Option({ opt: options_default.theme.osd.radius, title: "Radius", subtitle: "Radius of the on-screen-display that indicates volume/brightness change", type: "string" }),
        Option({ opt: options_default.theme.osd.margins, title: "Margins", subtitle: "Margins in the following format: top right bottom left", type: "string" }),
        Option({ opt: options_default.theme.osd.muted_zero, title: "Mute Volume as Zero", subtitle: "Display volume as 0 when muting, instead of previous device volume", type: "boolean" })
      ]
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/pages/config/index.ts
var CurrentPage2 = Variable("General");
var pagerMap2 = [
  "General",
  "Bar",
  "Notifications",
  "OSD",
  "Clock Menu",
  "Dashboard Menu"
];
var SettingsMenu = () => {
  return Widget.Box({
    vertical: true,
    children: CurrentPage2.bind("value").as((v) => {
      return [
        Widget.Box({
          class_name: "option-pages-container",
          hpack: "center",
          hexpand: true,
          children: pagerMap2.map((page) => {
            return Widget.Button({
              hpack: "center",
              class_name: `pager-button ${v === page ? "active" : ""}`,
              label: page,
              on_primary_click: () => CurrentPage2.value = page
            });
          })
        }),
        Widget.Stack({
          vexpand: true,
          class_name: "themes-menu-stack",
          children: {
            General: BarGeneral(),
            Bar: BarSettings(),
            Notifications: NotificationSettings(),
            OSD: OSDSettings(),
            "Clock Menu": ClockMenuSettings(),
            "Dashboard Menu": DashboardMenuSettings()
          },
          shown: CurrentPage2.bind("value")
        })
      ];
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/side_effects/index.ts
var { show_numbered, show_icons } = options_default.bar.workspaces;
var { monochrome: monoBar } = options_default.theme.bar.buttons;
var { monochrome: monoMenu } = options_default.theme.bar.menus;
var { matugen: matugen5 } = options_default.theme;
show_numbered.connect("changed", ({ value }) => {
  if (value === true) {
    show_icons.value = false;
  }
});
show_icons.connect("changed", ({ value }) => {
  if (value === true) {
    show_numbered.value = false;
  }
});
matugen5.connect("changed", ({ value }) => {
  if (value === true) {
    monoBar.value = false;
    monoMenu.value = false;
  }
});

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/widget/settings/SettingsDialog.ts
var CurrentPage3 = Variable("Configuration");
var pagerMap3 = [
  "Configuration",
  "Theming"
];
var Header23 = () => Widget.CenterBox({
  class_name: "header",
  start_widget: Widget.Button({
    class_name: "reset",
    on_clicked: options_default.reset,
    hpack: "start",
    vpack: "start",
    child: Widget.Icon(icons_default.ui.refresh),
    tooltip_text: "Reset"
  }),
  center_widget: Widget.Box({}),
  end_widget: Widget.Button({
    class_name: "close",
    hpack: "end",
    vpack: "start",
    child: Widget.Icon(icons_default.ui.close),
    on_clicked: () => App.closeWindow("settings-dialog")
  })
});
var PageContainer = () => {
  return Widget.Box({
    hpack: "fill",
    hexpand: true,
    vertical: true,
    children: CurrentPage3.bind("value").as((v) => {
      return [
        Widget.Box({
          class_name: "option-pages-container",
          hpack: "center",
          hexpand: true,
          children: pagerMap3.map((page) => {
            return Widget.Button({
              xalign: 0,
              hpack: "center",
              class_name: `pager-button ${v === page ? "active" : ""} category`,
              label: page,
              on_primary_click: () => CurrentPage3.value = page
            });
          })
        }),
        Widget.Stack({
          vexpand: false,
          class_name: "themes-menu-stack",
          children: {
            Configuration: SettingsMenu(),
            Theming: ThemesMenu()
          },
          shown: CurrentPage3.bind("value")
        })
      ];
    })
  });
};
var SettingsDialog_default = () => RegularWindow_default({
  name: "settings-dialog",
  class_name: "settings-dialog",
  title: "Settings",
  setup(win) {
    win.on("delete-event", () => {
      win.hide();
      return true;
    });
    win.set_default_size(200, 300);
  },
  child: Widget.Box({
    class_name: "settings-dialog-box",
    vertical: true,
    children: [
      Header23(),
      PageContainer()
    ]
  })
});

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/notifications/image/index.ts
var Image2 = (notif) => {
  if (notifHasImg(notif)) {
    return Widget.Box({
      class_name: "notification-card-image-container",
      hpack: "center",
      vpack: "center",
      vexpand: false,
      child: Widget.Box({
        hpack: "center",
        vexpand: false,
        class_name: "notification-card-image",
        css: `background-image: url("${notif.image}")`
      })
    });
  }
  return Widget.Box();
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/notifications/actions/index.ts
var Action = (notif, notifs3) => {
  if (notif.actions !== undefined && notif.actions.length > 0) {
    return Widget.Box({
      class_name: "notification-card-actions",
      hexpand: true,
      vpack: "end",
      children: notif.actions.map((action) => {
        return Widget.Button({
          hexpand: true,
          class_name: "notification-action-buttons",
          on_primary_click: () => {
            if (action.id.includes("scriptAction:-")) {
              Utils.execAsync(`${action.id.replace("scriptAction:-", "")}`).catch((err) => console.error(err));
              notifs3.CloseNotification(notif.id);
            } else {
              notif.invoke(action.id);
            }
          },
          child: Widget.Box({
            hpack: "center",
            hexpand: true,
            children: [
              Widget.Label({
                class_name: "notification-action-buttons-label",
                hexpand: true,
                label: action.label,
                max_width_chars: 15,
                truncate: "end",
                wrap: true
              })
            ]
          })
        });
      })
    });
  }
  return Widget.Box();
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/notifications/header/index.ts
import GLib8 from "gi://GLib";

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/notifications/header/icon.ts
var NotificationIcon2 = ({ app_entry, app_icon, app_name }) => {
  let icon2 = icons_default2.fallback.notification;
  if (Utils.lookUpIcon(app_name) || Utils.lookUpIcon(app_name.toLowerCase() || ""))
    icon2 = Utils.lookUpIcon(app_name) ? app_name : Utils.lookUpIcon(app_name.toLowerCase()) ? app_name.toLowerCase() : "";
  if (Utils.lookUpIcon(app_icon) && icon2 === "")
    icon2 = app_icon;
  if (Utils.lookUpIcon(app_entry || "") && icon2 === "")
    icon2 = app_entry || "";
  return Widget.Box({
    css: `
            min-width: 2rem;
            min-height: 2rem;
        `,
    child: Widget.Icon({
      class_name: "notification-icon",
      icon: icon2
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/notifications/header/index.ts
var time5 = (time6, format2 = "%I:%M %p") => GLib8.DateTime.new_from_unix_local(time6).format(format2);
var Header24 = (notif) => {
  return Widget.Box({
    vertical: false,
    hexpand: true,
    children: [
      Widget.Box({
        class_name: "notification-card-header",
        hpack: "start",
        children: [NotificationIcon2(notif)]
      }),
      Widget.Box({
        class_name: "notification-card-header",
        hexpand: true,
        hpack: "start",
        vpack: "start",
        children: [
          Widget.Label({
            class_name: "notification-card-header-label",
            hpack: "start",
            hexpand: true,
            vexpand: true,
            max_width_chars: !notifHasImg(notif) ? 30 : 19,
            truncate: "end",
            wrap: true,
            label: notif["summary"]
          })
        ]
      }),
      Widget.Box({
        class_name: "notification-card-header menu",
        hpack: "end",
        vpack: "start",
        hexpand: true,
        child: Widget.Label({
          vexpand: true,
          class_name: "notification-time",
          label: time5(notif.time)
        })
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/notifications/body/index.ts
var Body2 = (notif) => {
  return Widget.Box({
    vpack: "start",
    hexpand: true,
    class_name: "notification-card-body",
    children: [
      Widget.Label({
        hexpand: true,
        use_markup: true,
        xalign: 0,
        justification: "left",
        truncate: "end",
        lines: 2,
        max_width_chars: !notifHasImg(notif) ? 35 : 28,
        wrap: true,
        class_name: "notification-card-body-label",
        label: notif["body"]
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/notifications/close/index.ts
var CloseButton2 = (notif, notifs3) => {
  return Widget.Button({
    class_name: "close-notification-button",
    on_primary_click: () => {
      notifs3.CloseNotification(notif.id);
    },
    child: Widget.Label({
      class_name: "txt-icon notif-close",
      label: "\uDB80\uDD5C",
      hpack: "center"
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/notifications/index.ts
var notifs3 = await Service.import("notifications");
var hyprland7 = await Service.import("hyprland");
var { position, timeout, cache_actions, monitor, active_monitor } = options_default.notifications;
var curMonitor = Variable(monitor.value);
hyprland7.active.connect("changed", () => {
  curMonitor.value = hyprland7.active.monitor.id;
});
var notifications_default2 = () => {
  Utils.merge([timeout.bind("value"), cache_actions.bind("value")], (timeout2, doCaching) => {
    notifs3.popupTimeout = timeout2;
    notifs3.cacheActions = doCaching;
  });
  return Widget.Window({
    name: "notifications-window",
    class_name: "notifications-window",
    monitor: Utils.merge([
      curMonitor.bind("value"),
      monitor.bind("value"),
      active_monitor.bind("value")
    ], (curMon, mon, activeMonitor) => {
      if (activeMonitor === true) {
        return curMon;
      }
      return mon;
    }),
    layer: "overlay",
    anchor: position.bind("value").as((v) => getPosition(v)),
    exclusivity: "normal",
    child: Widget.Box({
      class_name: "notification-card-container",
      vertical: true,
      hexpand: true,
      setup: (self) => {
        self.hook(notifs3, () => {
          return self.children = notifs3.popups.map((notif) => {
            return Widget.Box({
              class_name: "notification-card",
              vpack: "start",
              hexpand: true,
              children: [
                Image2(notif),
                Widget.Box({
                  vpack: "start",
                  vertical: true,
                  hexpand: true,
                  class_name: `notification-card-content ${!notifHasImg(notif) ? "noimg" : ""}`,
                  children: [Header24(notif), Body2(notif), Action(notif, notifs3)]
                }),
                CloseButton2(notif, notifs3)
              ]
            });
          });
        });
      }
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/osd/label/index.ts
var audio9 = await Service.import("audio");
var OSDLabel = (ort) => {
  return Widget.Box({
    class_name: "osd-label-container",
    hexpand: true,
    vexpand: true,
    child: Widget.Label({
      class_name: "osd-label",
      hexpand: true,
      vexpand: true,
      hpack: "center",
      vpack: "center",
      setup: (self) => {
        self.hook(Brightness_default, () => {
          self.class_names = self.class_names.filter((c) => c !== "overflow");
          self.label = `${Math.round(Brightness_default.screen * 100)}`;
        }, "notify::screen");
        self.hook(Brightness_default, () => {
          self.class_names = self.class_names.filter((c) => c !== "overflow");
          self.label = `${Math.round(Brightness_default.kbd * 100)}`;
        }, "notify::kbd");
        self.hook(audio9.microphone, () => {
          self.toggleClassName("overflow", audio9.microphone.volume > 1);
          self.label = `${Math.round(audio9.microphone.volume * 100)}`;
        }, "notify::volume");
        self.hook(audio9.microphone, () => {
          self.toggleClassName("overflow", audio9.microphone.volume > 1 && (!options_default.theme.osd.muted_zero.value || audio9.microphone.is_muted === false));
          self.label = `${options_default.theme.osd.muted_zero.value && audio9.microphone.is_muted !== false ? 0 : Math.round(audio9.microphone.volume * 100)}`;
        }, "notify::is-muted");
        self.hook(audio9.speaker, () => {
          self.toggleClassName("overflow", audio9.speaker.volume > 1);
          self.label = `${Math.round(audio9.speaker.volume * 100)}`;
        }, "notify::volume");
        self.hook(audio9.speaker, () => {
          self.toggleClassName("overflow", audio9.speaker.volume > 1 && (!options_default.theme.osd.muted_zero.value || audio9.speaker.is_muted === false));
          self.label = `${options_default.theme.osd.muted_zero.value && audio9.speaker.is_muted !== false ? 0 : Math.round(audio9.speaker.volume * 100)}`;
        }, "notify::is-muted");
      }
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/osd/bar/index.ts
var audio10 = await Service.import("audio");
var OSDBar = (ort) => {
  return Widget.Box({
    class_name: "osd-bar-container",
    children: [
      Widget.LevelBar({
        class_name: "osd-bar",
        vertical: ort === "vertical",
        inverted: ort === "vertical",
        bar_mode: "continuous",
        setup: (self) => {
          self.hook(Brightness_default, () => {
            self.class_names = self.class_names.filter((c) => c !== "overflow");
            self.value = Brightness_default.screen;
          }, "notify::screen");
          self.hook(Brightness_default, () => {
            self.class_names = self.class_names.filter((c) => c !== "overflow");
            self.value = Brightness_default.kbd;
          }, "notify::kbd");
          self.hook(audio10.microphone, () => {
            self.toggleClassName("overflow", audio10.microphone.volume > 1);
            self.value = audio10.microphone.volume <= 1 ? audio10.microphone.volume : audio10.microphone.volume - 1;
          }, "notify::volume");
          self.hook(audio10.microphone, () => {
            self.toggleClassName("overflow", audio10.microphone.volume > 1 && (!options_default.theme.osd.muted_zero.value || audio10.microphone.is_muted === false));
            self.value = options_default.theme.osd.muted_zero.value && audio10.microphone.is_muted !== false ? 0 : audio10.microphone.volume <= 1 ? audio10.microphone.volume : audio10.microphone.volume - 1;
          }, "notify::is-muted");
          self.hook(audio10.speaker, () => {
            self.toggleClassName("overflow", audio10.speaker.volume > 1);
            self.value = audio10.speaker.volume <= 1 ? audio10.speaker.volume : audio10.speaker.volume - 1;
          }, "notify::volume");
          self.hook(audio10.speaker, () => {
            self.toggleClassName("overflow", audio10.speaker.volume > 1 && (!options_default.theme.osd.muted_zero.value || audio10.speaker.is_muted === false));
            self.value = options_default.theme.osd.muted_zero.value && audio10.speaker.is_muted !== false ? 0 : audio10.speaker.volume <= 1 ? audio10.speaker.volume : audio10.speaker.volume - 1;
          }, "notify::is-muted");
        }
      })
    ]
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/osd/icon/index.ts
var audio11 = await Service.import("audio");
var OSDIcon = (ort) => {
  return Widget.Box({
    class_name: "osd-icon-container",
    hexpand: true,
    child: Widget.Label({
      class_name: "osd-icon txt-icon",
      hexpand: true,
      vexpand: true,
      hpack: "center",
      vpack: "center",
      setup: (self) => {
        self.hook(Brightness_default, () => {
          self.label = "\uDB84\uDF56";
        }, "notify::screen");
        self.hook(Brightness_default, () => {
          self.label = "\uDB82\uDD7B";
        }, "notify::kbd");
        self.hook(audio11.microphone, () => {
          self.label = audio11.microphone.is_muted ? "\uDB80\uDF6D" : "\uDB80\uDF6C";
        }, "notify::volume");
        self.hook(audio11.microphone, () => {
          self.label = audio11.microphone.is_muted ? "\uDB80\uDF6D" : "\uDB80\uDF6C";
        }, "notify::is-muted");
        self.hook(audio11.speaker, () => {
          self.label = audio11.speaker.is_muted ? "\uDB81\uDF5F" : "\uDB81\uDD7E";
        }, "notify::volume");
        self.hook(audio11.speaker, () => {
          self.label = audio11.speaker.is_muted ? "\uDB81\uDF5F" : "\uDB81\uDD7E";
        }, "notify::is-muted");
      }
    })
  });
};

// ohSystemmm-doties/System-Area.d/3_Package-Config/0_App-Configs/ags/modules/osd/index.ts
var hyprland8 = await Service.import("hyprland");
var audio12 = await Service.import("audio");
var {
  enable,
  orientation,
  location,
  active_monitor: active_monitor2,
  monitor: monitor2
} = options_default.theme.osd;
var curMonitor2 = Variable(monitor2.value);
hyprland8.active.connect("changed", () => {
  curMonitor2.value = hyprland8.active.monitor.id;
});
var DELAY = 2500;
var count = 0;
var handleReveal = (self, property) => {
  if (!enable.value) {
    return;
  }
  self[property] = true;
  count++;
  Utils.timeout(DELAY, () => {
    count--;
    if (count === 0)
      self[property] = false;
  });
};
var renderOSD = () => {
  return Widget.Revealer({
    transition: "crossfade",
    reveal_child: false,
    setup: (self) => {
      self.hook(Brightness_default, () => {
        handleReveal(self, "reveal_child");
      }, "notify::screen");
      self.hook(Brightness_default, () => {
        handleReveal(self, "reveal_child");
      }, "notify::kbd");
      self.hook(audio12.microphone, () => {
        handleReveal(self, "reveal_child");
      }, "notify::volume");
      self.hook(audio12.microphone, () => {
        handleReveal(self, "reveal_child");
      }, "notify::is-muted");
      self.hook(audio12.speaker, () => {
        handleReveal(self, "reveal_child");
      }, "notify::volume");
      self.hook(audio12.speaker, () => {
        handleReveal(self, "reveal_child");
      }, "notify::is-muted");
    },
    child: Widget.Box({
      class_name: "osd-container",
      vertical: orientation.bind("value").as((ort) => ort === "vertical"),
      children: orientation.bind("value").as((ort) => {
        if (ort === "vertical") {
          return [
            OSDLabel(ort),
            OSDBar(ort),
            OSDIcon(ort)
          ];
        }
        return [
          OSDIcon(ort),
          OSDBar(ort),
          OSDLabel(ort)
        ];
      })
    })
  });
};
var osd_default = () => Widget.Window({
  monitor: Utils.merge([
    curMonitor2.bind("value"),
    monitor2.bind("value"),
    active_monitor2.bind("value")
  ], (curMon, mon, activeMonitor) => {
    if (activeMonitor === true) {
      return curMon;
    }
    return mon;
  }),
  name: `indicator`,
  class_name: "indicator",
  layer: "overlay",
  anchor: location.bind("value").as((v) => getPosition(v)),
  click_through: true,
  child: Widget.Box({
    css: "padding: 1px;",
    expand: true,
    child: renderOSD()
  }),
  setup: (self) => {
    self.hook(enable, () => {
      handleReveal(self, "visible");
    });
    self.hook(Brightness_default, () => {
      handleReveal(self, "visible");
    }, "notify::screen");
    self.hook(Brightness_default, () => {
      handleReveal(self, "visible");
    }, "notify::kbd");
    self.hook(audio12.microphone, () => {
      handleReveal(self, "visible");
    }, "notify::volume");
    self.hook(audio12.microphone, () => {
      handleReveal(self, "visible");
    }, "notify::is-muted");
    self.hook(audio12.speaker, () => {
      handleReveal(self, "visible");
    }, "notify::volume");
    self.hook(audio12.speaker, () => {
      handleReveal(self, "visible");
    }, "notify::is-muted");
  }
});

// /home/ohsystemmm/.config/ags/main.ts
App.config({
  onConfigParsed: () => Utils.execAsync(`python3 ${App.configDir}/services/bluetooth.py`),
  windows: [
    ...main_default,
    notifications_default2(),
    SettingsDialog_default(),
    ...forMonitors(Bar),
    osd_default()
  ],
  closeWindowDelay: {
    sideright: 350,
    launcher: 350,
    bar0: 350
  }
});
