$(function() {
    $(document).on('click', '#show-hide-navigation', function() {
        var $header = $('#header');

        $header.toggleClass('nav-closed');
        $(this).toggleClass("fa-angle-left");
        $(this).toggleClass("fa-angle-right");
    });
});

$(function() {
    $(document).on('click', '.search-submit-wrapper', function() {
        document.getElementById('search-field').focus();
        var e = $.Event( "keypress", { which: 13 } );
        $('#search-field').trigger(e);
    });
});

var langArray = ["en-us", "ja-jp", "ko-kr", "zh-cn"];
var localArray = ["English", "日本語", "한국어", "中文"];

var versionDictionary = {
    enus: {
        Core: {
            general: ["5_0_2","5_1_0","5_2_0","5_3_0","5_4_0","5_5_2","5_6_0","5_7_0","5_8_0","5_9_0","5_10_0","5_11_0","5_12_0","5_13_0","5_14_0","5_15_0","5_16_0","5_17_0","5_18_1","5_19_0","5_20_0","5_21_0"],
            "xbox-one": ["5_0_2","5_1_0","5_2_0","5_3_0","5_4_0","5_5_2","5_6_0","5_7_0","5_8_0","5_9_0","5_10_0","5_11_0","5_12_0","5_13_0","5_14_0","5_15_0"],
            "xbox-series-xs": ["5_14_0","5_15_0","5_16_0","5_17_0","5_18_1","5_19_0","5_20_0","5_21_0"],
            ps4: ["5_0_2","5_1_0","5_2_0","5_3_0","5_4_0","5_5_2","5_6_0","5_7_0","5_8_0","5_9_0","5_10_0","5_11_0","5_12_0","5_13_0","5_14_0","5_15_0","5_16_0","5_17_0","5_18_1","5_19_0","5_20_0","5_21_0"],
            ps5: ["5_14_0","5_15_0","5_16_0","5_17_0","5_18_1","5_19_0","5_20_0","5_21_0"],
            switch: ["5_1_0","5_2_0","5_3_0","5_4_0","5_5_2","5_6_0","5_7_0","5_8_0","5_9_0","5_10_0","5_11_0","5_12_0","5_13_0","5_14_0","5_15_0","5_16_0","5_17_0","5_18_1","5_19_0","5_20_0","5_21_0"],
            stadia: ["5_2_0","5_3_0","5_4_0","5_5_2","5_6_0","5_7_0","5_8_0","5_9_0","5_10_0","5_11_0","5_12_0","5_13_0","5_14_0","5_15_0","5_16_0","5_17_0","5_18_1","5_19_0"],
        },
        Unity: {
            general: ["5_0_2","5_1_0","5_2_0","5_7_0","5_8_0","5_10_0","5_11_0","5_12_0","5_13_0","5_14_0","5_15_0","15_1_160000","15_1_170000","15_1_180000","15_1_190000","15_1_200000","15_1_210000"],
            "xbox-one": [],
            "xbox-series-xs": [],
            ps4: [],
            ps5: [],
            switch: [],
            stadia: [],
        },
        Unreal: {
            general: ["5_0_2","5_1_0","5_2_0","5_3_0","5_7_0","5_10_0","5_11_0","5_12_0","5_13_0","5_14_0","5_15_0","5_16_0","5_17_0","5_18_1","5_19_0","5_20_0","5_21_0"],
            "xbox-one": [],
            "xbox-series-xs": [],
            ps4: [],
            ps5: [],
            switch: [],
            stadia: [],
        }
    },
    kokr: {
        Core: {
            general: ["5_0_2","5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            "xbox-one": ["5_0_2","5_1_0","5_7_0","5_11_0","5_14_0","5_15_0"],
            "xbox-series-xs": ["5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            ps4: ["5_0_2","5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            ps5: ["5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            switch: ["5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            stadia: ["5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1"],
        },
        Unity: {
            general: ["5_0_2","5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","15_1_160000","15_1_180000","15_1_190000"],
            "xbox-one": [],
            "xbox-series-xs": [],
            ps4: [],
            ps5: [],
            switch: [],
            stadia: [],
        },
        Unreal: {
            general: ["5_0_2","5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            "xbox-one": [],
            "xbox-series-xs": [],
            ps4: [],
            ps5: [],
            switch: [],
            stadia: [],
        }
    },
    jajp: {
        Core: {
            general: ["5_0_2","5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            "xbox-one": ["5_0_2","5_1_0","5_7_0","5_11_0","5_14_0","5_15_0"],
            "xbox-series-xs": ["5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            ps4: ["5_0_2","5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            ps5: ["5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            switch: ["5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            stadia: ["5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1"],
        },
        Unity: {
            general: ["5_0_2","5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","15_1_160000","15_1_180000","15_1_190000"],
            "xbox-one": [],
            "xbox-series-xs": [],
            ps4: [],
            ps5: [],
            switch: [],
            stadia: [],
        },
        Unreal: {
            general: ["5_0_2","5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            "xbox-one": [],
            "xbox-series-xs": [],
            ps4: [],
            ps5: [],
            switch: [],
            stadia: [],
        }
    },
    zhcn: {
        Core: {
            general: ["5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            "xbox-one": ["5_1_0","5_7_0","5_11_0","5_14_0","5_15_0"],
            "xbox-series-xs": ["5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            ps4: ["5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            ps5: ["5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            switch: ["5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            stadia: ["5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1"],
        },
        Unity: {
            general: ["5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","15_1_160000","15_1_180000","15_1_190000"],
            "xbox-one": [],
            "xbox-series-xs": [],
            ps4: [],
            ps5: [],
            switch: [],
            stadia: [],
        },
        Unreal: {
            general: ["5_1_0","5_7_0","5_11_0","5_14_0","5_15_0","5_16_0","5_18_1","5_19_0"],
            "xbox-one": [],
            "xbox-series-xs": [],
            ps4: [],
            ps5: [],
            switch: [],
            stadia: [],
        }
    }
};

var engine = "";
var platform = "";
var language = "";
var staging = "";
var version = "";
var optionList = "";

$(document).ready(function(){

    if(SetEnginePlatform() != 0)
    {
        return;
    }
    ApplyFontAwesome();
    //var TocLoc = document.getElementsByClassName("tree-node-selected");
    //TocLoc.className = "tree-node tree-node-expanded tree-node-selected fa fa-folder";
    //print(versionDictionary[language][engine][platform] + "      " + version);
    $("#header-title").after(optionList);
    $("#VersionSelect").change(function(e) {
            var version = $("#VersionSelect").find(":selected").attr("value")
            language = "/" + language.substring(0, 2) + "-" + language.substr(2,2) + "/";
            if(version == "5_5_2")
                version = "5_5_0";
	    else if(version == "5_18_1")
                version = "5_18_0";
            if(!(~window.location.href.indexOf(version)))
            {
		        window.location.href = "https://"+ staging + "docs.vivox.com/v5/" + platform + "/" + engine.toLowerCase() + "/" + version  + language + "Default.htm#" + engine + "/" + engine + ".htm%3FTocPath%3D" + engine + "%7C_____0";
            }
        })
})

function ApplyFontAwesome()
{
    $("#show-hide-navigation").addClass("fa");
    $("#show-hide-navigation").addClass("fa-angle-left");
    $(".search-submit").addClass("fa");
    $(".search-submit").addClass("fa-search");
    if(langArray.includes(language.slice(0,2) + "-" + language.slice(2)) && (versionDictionary["kokr"][engine][platform].includes(version) || versionDictionary["zhcn"][engine][platform].includes(version) || versionDictionary["jajp"][engine][platform].includes(version)))
    {
        localizedLang = localArray[langArray.indexOf(language.slice(0,2) + "-" + language.slice(2))];
        $("div div button.select-language-button").addClass("fa");
        $("div div button.select-language-button").addClass("fa-globe-americas");
        $("div div div button.select-language-button").prepend("<p>" + localizedLang + "</p>");
        $("div div .fas").click(function(){
            $("div div .fas").mouseleave(function(){
                $(".select-language-drop-down ul li a").mouseenter(function(){
                    var originalHref = $(this).attr("href");
                    var newHref = originalHref.split("#")[0] + "#" + engine + "/" + engine + ".htm";
                    $(this).attr("href", newHref);
                })
            })
        })
    }
}

function SetEnginePlatform()
{
    var versionList;
    if(~window.location.href.indexOf("en-us"))
    {
        language = "enus"
        versionList = versionDictionary.enus;
    }
    else if(~window.location.href.indexOf("ja-jp"))
    {
        language = "jajp"
        versionList = versionDictionary.jajp;
    }
    else if(~window.location.href.indexOf("ko-kr"))
    {
        language = "kokr"
        versionList = versionDictionary.kokr;
    }
    else if(~window.location.href.indexOf("zh-cn"))
    {
        language = "zhcn"
        versionList = versionDictionary.zhcn;
    }
    else
    {
        language = "enus";
        versionList = versionDictionary.enus;
    }
    if(~window.location.href.toLowerCase().indexOf("vstg"))
    {
        staging = "vstg-";
    }
    if(~window.location.href.toLowerCase().indexOf("core"))
    {
        engine = "Core";
    }
    else if(~window.location.href.toLowerCase().indexOf("unreal"))
    {
        engine = "Unreal";
    }
    else if(~window.location.href.toLowerCase().indexOf("unity"))
    {
        engine = "Unity";
    }
    else
    {
        return -1;
    }
    if(~window.location.href.indexOf("xbox-one"))
    {
        platform = "xbox-one";
    }
    else if(~window.location.href.indexOf("xbox-series-xs"))
    {
        platform = "xbox-series-xs";
    }
    else if(~window.location.href.indexOf("ps4"))
    {
        platform = "ps4";
    }
    else if(~window.location.href.indexOf("ps5"))
    {
        platform = "ps5";
    }
    else if(~window.location.href.indexOf("general"))
    {
        platform = "general";
    }
    else if(~window.location.href.indexOf("switch"))
    {
        platform = "switch";
    }
    else if(~window.location.href.indexOf("stadia"))
    {
        platform = "stadia";
    }
    else
    {
        return -1;
    }


    versionList = versionList[engine][platform];

    if(~window.location.href.indexOf("5_0_2"))
    {
        version = "5_0_2";
        if(!versionList.includes("5_0_2"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_1_0"))
    {
        version = "5_1_0";
        if(!versionList.includes("5_1_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_2_0"))
    {
        version = "5_2_0";
        if(!versionList.includes("5_2_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_3_0"))
    {
        version = "5_3_0";
        if(!versionList.includes("5_3_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_4_0"))
    {
        version = "5_4_0";
        if(!versionList.includes("5_4_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_5_0"))
    {
        version = "5_5_2";
        if(!versionList.includes("5_5_2"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_6_0"))
    {
        version = "5_6_0";
        if(!versionList.includes("5_6_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_7_0"))
    {
        version = "5_7_0";
        if(!versionList.includes("5_7_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_8_0"))
    {
        version = "5_8_0";
        if(!versionList.includes("5_8_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_9_0"))
    {
        version = "5_9_0";
        if(!versionList.includes("5_9_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_10_0"))
    {
        version = "5_10_0";
        if(!versionList.includes("5_10_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_11_0"))
    {
        version = "5_11_0";
        if(!versionList.includes("5_11_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_12_0"))
    {
        version = "5_12_0";
        if(!versionList.includes("5_12_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_13_0"))
    {
        version = "5_13_0";
        if(!versionList.includes("5_13_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_14_0"))
    {
        version = "5_14_0";
        if(!versionList.includes("5_14_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_15_0"))
    {
        version = "5_15_0";
        if(!versionList.includes("5_15_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_16_0"))
    {
        version = "5_16_0";
        if(!versionList.includes("5_16_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("15_1_160000"))
    {
        version = "15_1_160000";
        if(!versionList.includes("15_1_160000"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_17_0"))
    {
        version = "5_17_0";
        if(!versionList.includes("5_17_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("15_1_170000"))
    {
        version = "15_1_170000";
        if(!versionList.includes("15_1_170000"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_18_0"))
    {
        version = "5_18_1";
        if(!versionList.includes("5_18_1"))
            return 1;
    }
    else if(~window.location.href.indexOf("15_1_180000"))
    {
        version = "15_1_180000";
        if(!versionList.includes("15_1_180000"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_19_0"))
    {
        version = "5_19_0";
        if(!versionList.includes("5_19_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("15_1_190000"))
    {
        version = "15_1_190000";
        if(!versionList.includes("15_1_190000"))
            return 1;
    } 
    else if(~window.location.href.indexOf("5_20_0"))
    {
        version = "5_20_0";
        if(!versionList.includes("5_20_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("15_1_200000"))
    {
        version = "15_1_200000";
        if(!versionList.includes("15_1_200000"))
            return 1;
    }
    else if(~window.location.href.indexOf("5_21_0"))
    {
        version = "5_21_0";
        if(!versionList.includes("5_21_0"))
            return 1;
    }
    else if(~window.location.href.indexOf("15_1_210000"))
    {
        version = "15_1_210000";
        if(!versionList.includes("15_1_210000"))
            return 1;
    }
    else
    {
        return 1;
    }

     if(window.location.href.endsWith("Default.htm") && versionList[versionList.length - 1] != version)
    {
        language = "/" + language.substring(0, 2) + "-" + language.substr(2,2) + "/";
        version = versionList[versionList.length - 1];
        if(version == "5_5_2")
        {
            version = "5_5_0";
        }
        else if(version == "5_18_1")
        {
            version = "5_18_0";
        }
        window.location.href = "https://"+ staging + "docs.vivox.com/v5/" + platform + "/" + engine.toLowerCase() + "/" + version  + language + "Default.htm#" + engine + "/" + engine + ".htm%3FTocPath%3D" + engine + "%7C_____0";
        return;
    }

    optionList ='<div style=\"padding-top:65px; padding-left: 115px; font-family: Font Awesome 5 Pro; font-size: 15px;\"><a href=\"https://'+ staging + 'developer.vivox.com/\" target=\"_blank\">Return to Developer Portal</a><div style=\"padding-top: 60px; padding-left:20px\">Version:<span style=\"padding-left: 10px;\">';
    optionList += '<select id=\"VersionSelect\">';
    for(var i=versionList.length-1; i >= 0; i--)
    {
        if(versionList[i] == version)
        {
            if(version == "5.5.2")
            {
                baseVersion = "5.5.0";
                optionList += '<option value=\"' + baseVersion + '\" selected=\"selected\">'+ baseVersion.replace(/[_]/g,".") + '</option>';
                break;
            }
            else if(version == "5.18.1")
            {
                baseVersion = "5.18.0";
                optionList += '<option value=\"' + baseVersion + '\" selected=\"selected\">'+ baseVersion.replace(/[_]/g,".") + '</option>';
                break;
            }
            optionList += '<option value=\"' + versionList[i] + '\" selected=\"selected\">'+ versionList[i].replace(/[_]/g,".") + '</option>';
        }
        else
            optionList += '<option value=\"' + versionList[i] + '\">'+ versionList[i].replace(/[_]/g,".") + '</option>';
    }
    optionList += "</select>";
    return 0;
}