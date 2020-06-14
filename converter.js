class Converter {
	constructor(data_string) {
		this.data_string = data_string
	}
	convertJson() {
		const node = new DOMParser().parseFromString(this.data_string, 'text/xml')
		return this._toObject(node.getElementsByTagName('plist').item(0))
	}
	convertJsonString(replacer = null, space = 4) {
		return JSON.stringify(this.convertJson(), replacer, space)
	}

	_toObject(parent) {
		let child_nodes = []
		for(const item of parent.childNodes) {
			if (item.nodeName != '#text') {
				child_nodes.push(item)
			}
		}

		switch (parent.nodeName) {
			case 'plist':
				if (child_nodes.length > 1) {
					let plist = []
					for(const item of child_nodes) {
						plist.push(this._toObject(item))
					}
					return plist;
				} else {
					return this._toObject(child_nodes[0])
				}
			case 'dict':
				let dictionary = {}
				let key_name
				let key_value
				for(const item of child_nodes) {
					if (item.nodeName == '#text') {
					} else if (item.nodeName == 'key') {
						key_name = this._textValue(item.firstChild)
					} else {
						key_value = this._toObject(item)
						dictionary[key_name] = key_value
					}
				}
				return dictionary
			case 'array':
				let array = []
				for(const item of child_nodes) {
					array.push(this._toObject(item))
				}
				return array
			case 'string':
				return this._textValue(parent)
			case 'date':
				 return this._parseDate(this._textValue(parent)).toString()
			case 'integer':
				return parseInt(this._textValue(parent), 10)
			case 'real':
				return parseFloat(this._textValue(parent))
			case 'data':
				return this._textValue(parent)
			case 'true':
				return true
			case 'false':
				return false
			case '#text':
				break
		}
	}

	_textValue(node) {
		if (node.text) {
			return node.text
		} else {
			return node.textContent
		}
	}

	_parseDate(date_string) {
		const ptrn = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/
		var match = ptrn.exec(date_string)
		if (match) {
			return new Date(Date.UTC(+match[1], +match[2] - 1, +match[3], +match[4], +match[5], +match[6]))
		}
	}
}