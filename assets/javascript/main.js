// You can also require other files to run in this process
require('./renderer.js')
var $ = require('jQuery')

feather.replace()

// Metrics calculator
var inpImperial = $('#inpImperial'),
    selImperial = $('#selImperial'),
    inpMetric = $('#inpMetric'),
    selMetric = $('#selMetric'),
    lastFocus = $('#inpImperial').focus(),
    infoMeasure = $('#infoMeasure');

convertImperialMetric.imperials = {
    inch: 1,
    feet: 12,
    yard: 36,
    mile: 63360
};

convertImperialMetric.metrics = {
    mm: 10,
    cm: 1,
    dm: .1,
    m: .01,
    km: .00001
};

function convertImperialMetric() {
    var metrics = convertImperialMetric.metrics,
        imperials = convertImperialMetric.imperials,
        args = arguments,
        conversionTypes = {
            imperial: 'imperial',
            metric: 'metric'
        },
        toFixed = false,
        toFixedX = 2,
        intX, typImp, typMet, conType = 'metric',
        $ret;

    conversionTypes.i = conversionTypes.imp = conversionTypes.imperial;
    conversionTypes.m = conversionTypes.met = conversionTypes.metric;

    function setVarz(c) {
        for (i in c) {
            var a = c[i];
            switch (typeof a) {
                case "boolean":
                    toFixed = a;
                    break;
                case "number":
                    void 0 == intX ? intX = a : toFixedX = a;
                    break;
                case "string":
                    isNaN(parseFloat(a)) || void 0 != intX ? imperials.hasOwnProperty(a) ? typImp = a : metrics.hasOwnProperty(a) ? typMet = a : conversionTypes.hasOwnProperty(a) && (conType = conversionTypes[a]) : intX = parseFloat(a);
                    break;
                case "object":
                    if (a instanceof Array) setVarz.apply(this, [a]);
                    else if (a instanceof Object)
                        for (h in a) {
                            var b = a[h];
                            conversionTypes.hasOwnProperty(h) ? conType = conversionTypes[h] : imperials.hasOwnProperty(h) ? (typImp =
                                h, void 0 != intX || isNaN(parseFloat(b)) || (intX = parseFloat(b))) : metrics.hasOwnProperty(h) ? (typMet = h, void 0 != intX || isNaN(parseFloat(b)) || (intX = parseFloat(b))) : setVarz.apply(this, [
                                [b]
                            ])
                        }
            }
        }
    };
    setVarz(args);

    if (!isNaN(parseFloat(intX)) && imperials.hasOwnProperty(typImp) && metrics.hasOwnProperty(typMet) && conversionTypes.hasOwnProperty(conType)) {
        if (conType == 'metric') {
            var inches = intX * imperials[typImp],
                centimeters = inches * 2.54;
            $ret = centimeters * metrics[typMet];
        } else if (conType == 'imperial') {
            var centimeters = intX / metrics[typMet],
                inches = centimeters / 2.54;
            $ret = inches / imperials[typImp];
        }
    }

    return toFixed ? parseFloat($ret.toFixed(toFixedX)) : $ret;
}

$(function () {
    $.each(convertImperialMetric.imperials, function (x) {
        selImperial.prepend($('<option />', {
            text: x,
            value: x
        }));
    });
    $('#selImperial option[value=inch]').prop('selected', true).parent().change();
    inpImperial.attr('placeholder', 'Vnesite dolžino v ' + selImperial.find(":selected").text())

    $.each(convertImperialMetric.metrics, function (x) {
        selMetric.prepend($('<option />', {
            text: x,
            value: x
        }));
    });
    $('#selMetric option[value=mm]').prop('selected', true).parent().change();
    inpMetric.attr('placeholder', 'Vnesite dolžino v ' + selMetric.find(":selected").text())
    infoMeasure.text('1' + selImperial.find(":selected").text() + " = " + convertImperialMetric(1, "mm", "inch") + selMetric.find(":selected").text());

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
                if (!isNaN(val)) inpMetric.val(convertImperialMetric(val, imp, met));
            } else if (lastFocus[0].id == inpMetric[0].id) {
                inpImperial.val('');
                if (!isNaN(val)) inpImperial.val(convertImperialMetric(val, imp, met, 'imperial'));
            }
        })
        .on('change', 'select.metric-select', function (e) {
            lastFocus.trigger('keyup');
            inpImperial.attr('placeholder', 'Vnesite dolžino v ' + selImperial.find(":selected").text());
            inpMetric.attr('placeholder', 'Vnesite dolžino v ' + selMetric.find(":selected").text());
            infoMeasure.text('1' + selImperial.find(":selected").text() + " = " + convertImperialMetric(1, selMetric.find(":selected").text(), selImperial.find(":selected").text()) + selMetric.find(":selected").text());
        })
})

// Temperature calculator
var inpCelsius = $('#inpCelsius'),
    inpFahrenheit = $('#inpFahrenheit'),
    inpKelvin = $('#inpKelvin');

var convertTemperature = {
    c: 0,
    f: 32,
    k: 273.15,
};

$(function () {
    $(document)
        .on('keyup', 'input.temperature-input', function (e) {
            var val = parseFloat($(this).val()),
                cel = inpCelsius.val(),
                far = inpFahrenheit.val(),
                kel = inpKelvin.val()

            if (val == cel) {
                inpFahrenheit.val(convertTemperature.f + (val * (9 / 5)))
                inpKelvin.val(convertTemperature.k + val)
            } else if (val == far) {
                inpCelsius.val((val - convertTemperature.f) * (5 / 9));
                inpKelvin.val((val - convertTemperature.f) * (5 / 9) + convertTemperature.k)
            } else if (val == kel) {
                inpCelsius.val(val - convertTemperature.k)
                inpFahrenheit.val((val - convertTemperature.f) * (9 / 5) + convertTemperature.f)
            } else {
                clearFields();
            }
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
