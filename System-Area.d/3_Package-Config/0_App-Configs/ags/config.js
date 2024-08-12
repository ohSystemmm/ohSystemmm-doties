const time = Variable('', {
    poll: [1000, function() {
        return Date().toString()
    }],
})

const Bar = (/** @type {number} */ monitor) => Widget.Window({
    monitor,
    name: `bar${monitor}`,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
        start_widget: Widget.Label({
            hpack: 'center',
            label: 'Welcome to AGS! Test',
        }),
        end_widget: Widget.Label({
            hpack: 'center',
            label: time.bind(),
        }),
    }),
})

App.config({
    windows: [Bar(0)],
})
