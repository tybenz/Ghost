(function () {
    var ghostdown = function () {
        return [
            // ![] image syntax
            {
                type: 'lang',
                filter: function (text) {
                    var imageMarkdownRegex = /^(?:\{<(.*?)>\})?!(?:\[([^\n\]]*)\])(?:\(([^\n\]]*)\))?$/gim,
                        /* regex from isURL in node-validator. Yum! */
                        uriRegex = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i,
                        pathRegex = /^(\/)?([^\/\0]+(\/)?)+$/i;

                    return text.replace(imageMarkdownRegex, function (match, key, alt, src) {
                        var result = "";

                        if (src && (src.match(uriRegex) || src.match(pathRegex))) {
                            result = '<img class="js-upload-target" src="' + src + '"/>';
                        }
                        return '<section id="image_upload_' + key + '" class="js-drop-zone image-uploader">' + result +
                               '<div class="description">Add image of <strong>' + alt + '</strong></div>' +
                               '<input data-url="upload" class="js-fileupload main fileupload" type="file" name="uploadimage">' +
                               '</section>';
                    });
                }
            },
            {
                type: 'lang',
                filter: function (text) {
                    var split = text.split(/\n\n}[ \t]*/);

                    for (var i = 0, len = split.length; i < len; i++) {
                        if ( i == 0 ) split[i] = split[i].replace(/^}[ \t]*/, '');
                        split[i] = '<div class="awesome">' + split[i] + '</div>';
                    }

                    return split.join("\n\n");

                    var regex = /<[ \t]+([\s\S]*)\n\n</g,
                        newStr = '';

                    console.log('START');
                    while ( match = regex.exec(text) ) {
                        if ( match ) {
                            console.log(match);
                        }
                        text = text.replace( match[0], '<div class="awesome">' + match[3] ? match[3] : match[2] + '</div>' );
                    }
                    return text;
                }
            },
        ];
    };

    // Client-side export
    if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) {
        window.Showdown.extensions.ghostdown = ghostdown;
    }
    // Server-side export
    if (typeof module !== 'undefined') module.exports = ghostdown;
}());
