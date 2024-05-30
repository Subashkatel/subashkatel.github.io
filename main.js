"use strict";
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
function animate() {
    raf1 = requestAnimationFrame(animate),
    displacementFilter.scale.x = delta_scale,
    displacementFilter.scale.y = delta_scale,
    displacementSprite.x += delta_offset,
    displacementSprite.y += delta_offset,
    stage.filters = [displacementFilter],
    renderer.render(stage),
    document.querySelector("body").classList.contains("opa") || document.getElementById("content_about").classList.remove("force")
}
isMobile() && (document.querySelector("body").classList.remove("desktop"), document.querySelector("body").classList.add("mobile"), document.querySelector(".vs-section").classList.remove("vs-section"));
var displacementSprite,
    stage,
    texture2,
    displacementFilter,
    renderer,
    logo,
    raf1,
    incr1 = 0,
    incr2 = 0,
    incr3 = 0,
    reset = !1,
    le_scroll = null,
    delta_scale = 300,
    delta_offset = 2;
document.addEventListener("click", function(e) {
    e.target.classList.contains("la_classe") && (document.getElementById("content_about").classList.toggle("actif"), document.getElementById("content_about").classList.contains("actif") ? (isMobile() || (le_scroll.resize(), le_scroll.on(onscroll), le_scroll.vars.current = 0, le_scroll.vars.target = 0), console.log("ici"), document.getElementById("content_about").classList.add("force")) : isMobile() || le_scroll.off(onscroll), document.querySelector(".rachell").classList.toggle("actif"), document.querySelector(".rachell2").classList.toggle("actif"), document.querySelector("#inner_pixi canvas").classList.toggle("actif"))
});
var hovers = document.querySelectorAll("a, #about div");
hovers.forEach(function(e) {
    e.addEventListener("mouseenter", function(e) {
        if (!isMobile()) {
            var t = {
                var: delta_scale
            };
            TweenMax.to(t, .6, {
                var: 0,
                onUpdate: function e() {
                    delta_scale = t.var
                },
                ease: Power2.easeInOut
            })
        }
    }),
    e.addEventListener("mouseleave", function(e) {
        var t = {
            var: delta_scale
        };
        TweenMax.to(t, .6, {
            var: 300,
            onUpdate: function e() {
                delta_scale = t.var
            },
            ease: Power2.easeInOut
        })
    })
}),
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#inner_pixi canvas").classList.add("actif"),
    le_scroll = new global_custom2.default({
        preload: !0,
        native: !1,
        section: document.querySelector(".vs-section"),
        divs: document.querySelectorAll(".vs-div"),
        vs: {
            mouseMultiplier: .4
        }
    }),
    isMobile() || le_scroll.init()
});
var renderer = PIXI.autoDetectRenderer(1e3, 1e3, {
    transparent: !0
});
document.getElementById("inner_pixi").appendChild(renderer.view);
var stage = new PIXI.Container;
texture2 = PIXI.Texture.fromImage("images/fond.png"),
logo = new PIXI.Sprite(texture2),
displacementSprite = PIXI.Sprite.fromImage("images/effet.png"),
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
stage.addChild(displacementSprite),
stage.addChild(logo),
displacementSprite.scale.y = 2,
displacementSprite.scale.x = 2,
animate();
//# sourceMappingURL=./main.js.map
