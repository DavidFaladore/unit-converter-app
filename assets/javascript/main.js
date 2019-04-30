// You can also require other files to run in this process
require('./renderer.js')
var $ = require('jQuery')
var convert = require('convert-units')

feather.replace()

// Length calculator
var inpImperial = $('#inpImperial'),
    selImperial = $('#selImperial'),
    inpMetric = $('#inpMetric'),
    selMetric = $('#selMetric'),
    lastFocus = $('#inpImperial').focus(),
    infoLength = $('#infoLength');

convertLength = Array(
    "mm",
    "cm",
    "m",
    "in",
    "ft",
    "mi"
);

$(function () {
    $.each(convertLength, function (x) {
        selImperial.prepend($('<option />', {
            text: convertLength[x],
            value: convertLength[x]
        }));
        selMetric.prepend($('<option />', {
            text: convertLength[x],
            value: convertLength[x]
        }));
    });
    $('#selImperial option[value=in]').prop('selected', true).parent().change();
    inpImperial.attr('placeholder', 'Vnesite dolžino v ' + selImperial.find(":selected").text())

    $('#selMetric option[value=mm]').prop('selected', true).parent().change();
    inpMetric.attr('placeholder', 'Vnesite dolžino v ' + selMetric.find(":selected").text())
    infoLength.text('1' + selImperial.find(":selected").text() + " = " + convert(1).from("mm").to("in") + selMetric.find(":selected").text());

    $('#selImperial option[value=' + selMetric.find(":selected").val() + ']').hide()
    $('#selMetric option[value=' + selImperial.find(":selected").val() + ']').hide()

    $(document)
        .on('focus', 'input.metric-input', function (e) {
            lastFocus = $(this);
        })
        .on('keyup', 'input.metric-input', function (e) {
            var val = parseFloat($(this).val()),
                imp = selImperial.val(),
                met = selMetric.val();

            if (lastFocus[0].id == inpImperial[0].id) {
                inpMetric.val('');
                inpMetric.val(convert(val).from(imp).to(met));
            } else if (lastFocus[0].id == inpMetric[0].id) {
                inpImperial.val('');
                inpImperial.val(convert(val).from(met).to(imp));
            }
        })
        .on('change', 'select.metric-select', function (e) {
            lastFocus.trigger('keyup');
            inpImperial.attr('placeholder', 'Vnesite dolžino v ' + selImperial.find(":selected").text());
            inpMetric.attr('placeholder', 'Vnesite dolžino v ' + selMetric.find(":selected").text());
            infoLength.text('1' + selImperial.find(":selected").text() + " = " + convert(1).from(selMetric.find(":selected").text()).to(selImperial.find(":selected").text()) + selMetric.find(":selected").text());

            $('#selImperial option').show()
            $('#selMetric option').show()
            $('#selImperial option[value=' + selMetric.find(":selected").val() + ']').hide()
            $('#selMetric option[value=' + selImperial.find(":selected").val() + ']').hide()
        })
})

// Temperature calculator
var inpCelsius = $('#inpCelsius'),
    inpFahrenheit = $('#inpFahrenheit'),
    inpKelvin = $('#inpKelvin'),
    infoTemperature = $('#infoTemperature');

infoTemperature.text('0C° = ' + convert(0).from('C').to('F') + "F° = " + convert(0).from('C').to('K') + "K°")

$(function () {
    $(document)
        .on('keyup', 'input.temperature-input', function (e) {
            var val = parseFloat($(this).val()),
                cel = inpCelsius.val(),
                far = inpFahrenheit.val(),
                kel = inpKelvin.val()

            if (val == cel) {
                inpFahrenheit.val(convert(cel).from("C").to("F"))
                inpKelvin.val(convert(cel).from("C").to("K"))
            } else if (val == far) {
                inpCelsius.val(convert(far).from("F").to("C"));
                inpKelvin.val(convert(far).from("F").to("K"))
            } else if (val == kel) {
                inpCelsius.val(convert(kel).from("K").to("C"))
                inpFahrenheit.val(convert(kel).from("K").to("F"))
            } else {
                clearFields();
            }
        })
})

// Area calculator
var inpAreaTop = $('#inpAreaTop'),
    selAreaTop = $('#selAreaTop'),
    inpAreaBottom = $('#inpAreaBottom'),
    selAreaBottom = $('#selAreaBottom'),
    lastFocus = $('#inpAreaTop').focus(),
    infoArea = $('#infoArea');

convertArea = Array(
    "mm2",
    "cm2",
    "m2",
    "ha",
    "km2",
    "in2",
    "ft2",
    "mi2"
);

$(function () {
    $.each(convertArea, function (x) {
        var convertAreaItem = ""
        if (convertArea[x].includes("2")) {
            convertAreaItem = convertArea[x].split("2")[0] + "&sup2;";
        } else {
            convertAreaItem = convertArea[x]
        }
        selAreaTop.prepend($('<option />', {

            html: convertAreaItem,
            value: convertArea[x]
        }));
        selAreaBottom.prepend($('<option />', {
            html: convertAreaItem,
            value: convertArea[x]
        }));
    });

    $('#selAreaTop option[value=in2]').prop('selected', true).parent().change();
    inpAreaTop.attr('placeholder', 'Vnesite površino v ' + selAreaTop.find(":selected").text())

    $('#selAreaBottom option[value=mm2]').prop('selected', true).parent().change();
    inpAreaBottom.attr('placeholder', 'Vnesite površino v ' + selAreaBottom.find(":selected").text())
    infoArea.text('1' + selAreaTop.find(":selected").text() + " = " + convert(1).from("in2").to("mm2") + selAreaBottom.find(":selected").text());

    $('#selAreaTop option[value=' + selAreaBottom.find(":selected").val() + ']').hide()
    $('#selAreaBottom option[value=' + selAreaTop.find(":selected").val() + ']').hide()
    $(document)
        .on('focus', 'input.area-input', function (e) {
            lastFocus = $(this);
        })
        .on('keyup', 'input.area-input', function (e) {
            var val = parseFloat($(this).val()),
                areaTop = selAreaTop.val(),
                areaBottom = selAreaBottom.val();

            if (lastFocus[0].id == inpAreaTop[0].id) {
                inpAreaBottom.val('');
                inpAreaBottom.val(convert(val).from(areaTop).to(areaBottom));

            } else if (lastFocus[0].id == inpAreaBottom[0].id) {
                inpAreaTop.val('');
                inpAreaTop.val(convert(val).from(areaBottom).to(areaTop));
            }
        })
        .on('change', 'select.area-select', function (e) {
            lastFocus.trigger('keyup');
            inpAreaTop.attr('placeholder', 'Vnesite površino v ' + selAreaTop.find(":selected").text());
            inpAreaBottom.attr('placeholder', 'Vnesite površino v ' + selAreaBottom.find(":selected").text());
            $('#selAreaTop option').show();
            $('#selAreaBottom option').show();
            $('#selAreaTop option[value=' + selAreaBottom.find(":selected").val() + ']').hide()
            $('#selAreaBottom option[value=' + selAreaTop.find(":selected").val() + ']').hide()
            infoArea.text('1' + selAreaTop.find(":selected").text() + " = " + convert(1).from(selAreaTop.find(":selected").val()).to(selAreaBottom.find(":selected").val()) + selAreaBottom.find(":selected").text());
        })
})

// Volume calculator
var inpVolumeTop = $('#inpVolumeTop'),
    selVolumeTop = $('#selVolumeTop'),
    inpVolumeBottom = $('#inpVolumeBottom'),
    selVolumeBottom = $('#selVolumeBottom'),
    lastFocus = $('#inpVolumeTop').focus(),
    infoVolume = $('#infoVolume');

convertVolume = Array(
    "mm3",
    "cm3",
    "ml",
    "l",
    "m3",
    "km3",
    "in3",
    "fl-oz",
    "gal",
    "yd3"
);

$(function () {
    $.each(convertVolume, function (x) {
        var convertVolumeItem = ""
        if (convertVolume[x].includes("3")) {
            convertVolumeItem = convertVolume[x].split("3")[0] + "&sup3;";
        } else {
            convertVolumeItem = convertVolume[x]
        }
        selVolumeTop.prepend($('<option />', {
            html: convertVolumeItem,
            value: convertVolume[x]
        }));
        selVolumeBottom.prepend($('<option />', {
            html: convertVolumeItem,
            value: convertVolume[x]
        }));
    });

    $('#selVolumeTop option[value=in3]').prop('selected', true).parent().change();
    inpVolumeTop.attr('placeholder', 'Vnesite prostornino v ' + selVolumeTop.find(":selected").text())

    $('#selVolumeBottom option[value=mm3]').prop('selected', true).parent().change();
    inpVolumeBottom.attr('placeholder', 'Vnesite prostornino v ' + selVolumeBottom.find(":selected").text())
    infoVolume.text('1' + selVolumeTop.find(":selected").text() + " = " + convert(1).from("in3").to("mm3") + selVolumeBottom.find(":selected").text());

    $('#selVolumeTop option[value=' + selVolumeBottom.find(":selected").val() + ']').hide()
    $('#selVolumeBottom option[value=' + selVolumeTop.find(":selected").val() + ']').hide()

    $(document)
        .on('focus', 'input.volume-input', function (e) {
            lastFocus = $(this);
        })
        .on('keyup', 'input.volume-input', function (e) {
            var val = parseFloat($(this).val()),
                areaTop = selVolumeTop.val(),
                areaBottom = selVolumeBottom.val();

            if (lastFocus[0].id == inpVolumeTop[0].id) {
                inpVolumeBottom.val('');
                inpVolumeBottom.val(convert(val).from(areaTop).to(areaBottom));

            } else if (lastFocus[0].id == inpVolumeBottom[0].id) {
                inpVolumeTop.val('');
                inpVolumeTop.val(convert(val).from(areaBottom).to(areaTop));
            }
        })
        .on('change', 'select.volume-select', function (e) {
            lastFocus.trigger('keyup');
            inpVolumeTop.attr('placeholder', 'Vnesite prostornino v ' + selVolumeTop.find(":selected").text());
            inpVolumeBottom.attr('placeholder', 'Vnesite prostornino v ' + selVolumeBottom.find(":selected").text());
            infoVolume.text('1' + selVolumeTop.find(":selected").text() + " = " + convert(1).from(selVolumeTop.find(":selected").val()).to(selVolumeBottom.find(":selected").val()) + selVolumeBottom.find(":selected").text());

            $('#selVolumeTop option').show();
            $('#selVolumeBottom option').show();
            $('#selVolumeTop option[value=' + selVolumeBottom.find(":selected").val() + ']').hide()
            $('#selVolumeBottom option[value=' + selVolumeTop.find(":selected").val() + ']').hide()
        })
})

function clearFields() {
    $('input[type=number]').attr('value', '');
}

// Tabs data
function showTab(evt, tabName) {
    var i, tabcontent, tablink;
    tabcontent = $(".tab-content")

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablink = $(".tab-link")

    for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace(" active", "");
    }

    $("#" + tabName).fadeIn(1000);
    evt.currentTarget.className += " active";
}

function setFormHeight() {
    var calcData = $(".calc__data")
    var calcHeight = $(window).height() - ($(".tabbar-wrapper").height() + 15) - ($(".calc__heading").height() +
        9)
    calcData.css("height", calcHeight + "px")
}

$('.tabbar ul li a').on('click', function (e) {
    e.preventDefault();
    $('.tabbar ul li a').removeClass("active pressed disabled");
    $(this).addClass('active pressed disabled');
    clearFields();
});

$(document).ready(function () {
    showTab(event, 'length')
    setFormHeight()
});

$(window).resize(function () {
    setFormHeight()
});
