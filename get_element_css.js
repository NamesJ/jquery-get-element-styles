function getCSS(el) {
	let css = getCSSPath(el) + ' {\n';
	let style = getComputedStyle(el);
	for (let i=0; i<style.length; i++) {
		let name = style[i];
		let value = style.getPropertyValue(name);
		css += '  ' + name + ': ' + value + ';\n';
	}
	css += '}';
	return css;
}

function getCSSPath(el) {
    let rendered_path_parts = [];

    $( el ).parents().addBack().each((i, el) => {
        const $el = $( el );
        let current_el_path = $el.prop('tagName').toLowerCase();

        if ($el.attr('id')) {
            current_el_path += '#' + $el.attr('id');
        }

        if ($el.attr('class')) {
            current_el_path += '.' + $el.attr('class').split(' ').join('.');
        }

        rendered_path_parts.push( current_el_path );
    })

    return rendered_path_parts.join(' ');
}

function saveCSSFile(css, fileName) {
	const link = document.createElement('a');
	const file = new Blob([css], { type: 'text/plain' });
	link.href = URL.createObjectURL(file);
	link.download = fileName;
	link.click();
	URL.revokeObjectURL(link.href);
}

function getDownloadCSS(el) {
	saveCSSFile(getCSS(el), 'style.css')
}
