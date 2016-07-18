
(function() {
    var VM = function() {
        var self = this;
        
        self.string = m.prop("");
        self.font = m.prop("serif");
    };
    
    var component = {
        controller: function() {
            var self = this;
            
            self.vm =  new VM();
            
            self.change_string = function(e) {
                self.vm.string(e.target.value);
                self.draw_canvas();
            };

            self.change_font = function(e) {
                self.vm.font(e.target.value);
                self.draw_canvas();
            };

            self.draw_canvas = function() {
                m.redraw();
                html2canvas(document.getElementById("string"), {
                    onrendered: function(canvas) {
                        var container = document.getElementById("canvas-container")
                        container.textContent = null;
                        container.appendChild(canvas);
                    }
                });
            };
        },
        view: function(ctrl) {
            return [
                m("div", {class:"col-md-4"}, [
                    m("fieldset", {class:"form-group"}, [
                        m("label", {for:"input-string"}, "画像化したい文字を入力してね"),
                        m("input", {class:"form-control", id:"input-string", value:ctrl.vm.string(), oninput:ctrl.change_string}),
                    ]),
                    m("fieldset", {class:"form-group"}, [
                        m("label", {for:"select-font"}, "フォント"),
                        m("select", {class:"form-control", id:"select-font", oninput:ctrl.change_font}, [
                            m("option", {value:"serif"}, "明朝"),
                            m("option", {value:"sans-serif"}, "ゴシック"),
                            m("option", {value:"monospace"}, "等幅")
                        ])
                    ])
                ]),
                m("div", {class:"col-md-4 string-container"}, [
                    "↓プレビューだよ!",
                    m("div", [
                        m("span", {class:ctrl.vm.font(), id:"string"}, ctrl.vm.string())
                    ])
                ])
            ];
        }
    };
    
    m.mount(document.getElementById("mithril-component"), component);
})();