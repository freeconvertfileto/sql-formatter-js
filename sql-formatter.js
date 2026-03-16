(function() {
    var inputEl = document.getElementById('sqfInput');
    var outputEl = document.getElementById('sqfOutput');
    var dialectEl = document.getElementById('sqfDialect');
    var indentEl = document.getElementById('sqfIndent');
    var uppercaseEl = document.getElementById('sqfUppercase');
    var formatBtn = document.getElementById('sqfFormat');
    var copyBtn = document.getElementById('sqfCopy');
    var clearBtn = document.getElementById('sqfClear');

    var KEYWORDS = [
        'SELECT','FROM','WHERE','JOIN','LEFT JOIN','RIGHT JOIN','INNER JOIN','OUTER JOIN',
        'FULL JOIN','CROSS JOIN','ON','AND','OR','NOT','IN','EXISTS','BETWEEN','LIKE',
        'IS NULL','IS NOT NULL','INSERT','INTO','VALUES','UPDATE','SET','DELETE',
        'CREATE','TABLE','INDEX','VIEW','DATABASE','DROP','ALTER','ADD','COLUMN',
        'PRIMARY KEY','FOREIGN KEY','REFERENCES','UNIQUE','DEFAULT','NULL','NOT NULL',
        'GROUP BY','ORDER BY','HAVING','LIMIT','OFFSET','UNION','ALL','DISTINCT',
        'AS','CASE','WHEN','THEN','ELSE','END','BEGIN','COMMIT','ROLLBACK',
        'TRANSACTION','GRANT','REVOKE','TRUNCATE','EXPLAIN','ANALYZE'
    ];

    var CLAUSE_STARTERS = [
        'SELECT','FROM','WHERE','JOIN','LEFT JOIN','RIGHT JOIN','INNER JOIN',
        'OUTER JOIN','FULL JOIN','CROSS JOIN','ON','INSERT','INTO','VALUES',
        'UPDATE','SET','DELETE','CREATE','DROP','ALTER','GROUP BY','ORDER BY',
        'HAVING','LIMIT','OFFSET','UNION','BEGIN','COMMIT','ROLLBACK'
    ];

    function formatSQL(sql, indent, uppercase) {
        var indentStr = indent === 2 ? '  ' : '    ';

        // normalize whitespace
        var s = sql.replace(/\r\n/g, '\n').replace(/\t/g, ' ').trim();

        // case keywords
        KEYWORDS.slice().sort(function(a, b) { return b.length - a.length; }).forEach(function(kw) {
            var re = new RegExp('(?<![\\w])' + kw.replace(/ /g, '\\s+') + '(?![\\w])', 'gi');
            s = s.replace(re, uppercase ? kw : kw.toLowerCase());
        });

        // add newlines before clause starters
        CLAUSE_STARTERS.slice().sort(function(a, b) { return b.length - a.length; }).forEach(function(kw) {
            var word = uppercase ? kw : kw.toLowerCase();
            var re = new RegExp('(?<!\n)\\s+(' + word.replace(/ /g, '\\s+') + ')(?=\\s)', 'g');
            s = s.replace(re, '\n' + word);
        });

        // indent continuation lines (lines that are not clause starters)
        var lines = s.split('\n');
        var result = [];
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (!line) continue;
            var isClause = false;
            for (var j = 0; j < CLAUSE_STARTERS.length; j++) {
                var kw = uppercase ? CLAUSE_STARTERS[j] : CLAUSE_STARTERS[j].toLowerCase();
                if (line.toUpperCase().indexOf(CLAUSE_STARTERS[j]) === 0) {
                    isClause = true;
                    break;
                }
            }
            if (i === 0 || isClause) {
                result.push(line);
            } else {
                result.push(indentStr + line);
            }
        }

        return result.join('\n');
    }

    function doFormat() {
        if (!inputEl || !outputEl) return;
        var input = inputEl.value;
        if (!input.trim()) { outputEl.value = ''; return; }
        var indent = indentEl ? parseInt(indentEl.value, 10) : 2;
        var uppercase = uppercaseEl ? uppercaseEl.checked : true;
        outputEl.value = formatSQL(input, indent, uppercase);
    }

    if (formatBtn) formatBtn.addEventListener('click', doFormat);

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            if (!outputEl || !outputEl.value) return;
            navigator.clipboard.writeText(outputEl.value).then(function() {
                var orig = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(function() { copyBtn.textContent = orig; }, 1500);
            });
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (inputEl) inputEl.value = '';
            if (outputEl) outputEl.value = '';
        });
    }
})();
