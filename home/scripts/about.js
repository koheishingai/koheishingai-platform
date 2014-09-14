$(function () {
    function c(c) {
        alert(c)
    }

    function i() {
        var c = $(".URc.ega.Lab").innerWidth();
        c /= 45;
        var i = 14 * c,
            n = 31 * c,
            o = n / 165;
        o = 71 * o, 350 > o && (o = 349), $(".M3.qna.fPa").css("width", i).css("height", o + 1), $(".lHa.m5a").css("left", i - 1).css("width", n + 1), $(".k5.U9b.kXa").css("min-height", o), $(".wtJUvc.hq8QAb").css("height", o), $(".aGb.hXa.z3Hx4b").css("width", n + 1)
    }

    function n() {
        if ($(window).innerWidth() > 700) {
            var c = $(window).innerHeight(),
                i = $("#wrap").innerHeight(),
                n = c - i;
            n > 291 && (n -= 291, $("#footer").css("margin-top", 90 + n))
        }
    }
    $("#posts-tab").click(function () {
        $.ajax({
            url: "about/skills",
            type: "GET",
            success: c
        })
    }), i(), n(), $(window).resize(function () {
        timer !== !1 && clearTimeout(timer), timer = setTimeout(function () {
            console.log("resized"), i(), n()
        }, 200)
    }), $(".w1").click(function () {
        location.href = "/yousheet/overview"
    }), $(".w2").click(function () {
        location.href = "/usagidrop"
    }), $(".w3").click(function () {
        location.href = "/works/3"
    }), $(".c1").click(function () {
        location.href = "/home/loading_like_ios"
    }), $(".c2").click(function () {
        location.href = "/home/simple_uploader"
    }), $(".c3").click(function () {
        location.href = "/home/sign_up_login_box"
    }), $(".c4").click(function () {
        location.href = "/home/html_compressor"
    }), $(".c5").click(function () {
        location.href = "/home/my_portfolio"
    }), $(".r1").click(function () {
        location.href = "/home/mr_doob"
    }), $(".rr2").click(function () {
        location.href = "/home/pure_css_components"
    }), $(".a").click(function () {
        location.href = "/article"
    }), $(".c").click(function () {
        location.href = "/collections"
    }), $(".w").click(function () {
        location.href = "/works"
    }), $(".cko").click(function () {
        window.open("/", "_blank")
    }), $(".cwk").click(function () {
        location.href = "/"
    })
});