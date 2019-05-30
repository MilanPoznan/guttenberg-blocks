import classnames from 'classnames';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
const { Button } = wp.components;
export default registerBlockType('jsforwpblocks/content-repeater', {
	title: __('Content Repeater'),
	description: __('Repeat content field with index number multiple time '),
	category: 'common',
	icon: 'dashicons-controls-repeat',
	keywords: [
		__('Content Repeater', 'jsforwpblocks'),
		__('Repeater', 'jsforwpblocks'),
		__('Project Golas', 'jsforwpblocks'),
	],
	attributes: {
		items: {
			source: 'query',
			default: [],
			selector: '.item',
			query: {
				title: {
					type: 'string',
					source: 'text',
					selector: '.title',
				},
				index: {
					type: 'number',
					source: 'attribute',
					attribute: 'data-index',
				},
			},
		},
	},

	edit: props => {
		// var attributes = props.attributes;
		const {
			attributes: { items },
			className,
			setAttributes,
			isSelected,
		} = props;

    var itemList2 = items.map(item => {
      return (

      )
    })
		// console.log(items);
		var itemList = items
			.sort(function(a, b) {
				return a.index - b.index;
			})
			.map(item => {
				return (
					<div class="item">
						<RichText
							tagName="h1"
							placeholder={__('Here the title goes...', 'jsforwpblocks')}
							value={items.title}
							autoFocus="true"
							onChange={function(value) {
								var newObject = Object.assign({}, item, {
									title: value,
								});
								return props.setAttributes({
									items: [].concat(
										_cloneArray(
											props.attributes.items.filter(function(itemFilter) {
												return itemFilter.index != item.index;
											}),
										),
										[newObject],
									),
								});
							}}
						/>
					</div>
				);
			});
		function _cloneArray(arr) {
			if (Array.isArray(arr)) {
				for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
					arr2[i] = arr[i];
				}
				return arr2;
			} else {
				return Array.from(arr);
			}
		}
		const onClickToAddRow = () => {
			setAttributes({
				items: [].concat(_cloneArray(items), [
					{
						index: items.length,
						title: '',
					},
				]),
			});
			console.log('bilo sta');
		};
		// return
		return (
			<div className={className}>
				<div class="item-list"> {itemList} </div>
				<Button className={'button add-row'} onClick={onClickToAddRow}>
					Add Rows
				</Button>
			</div>
		);
	},
	save: function(props) {
		var attributes = props.attributes;

		if (attributes.items.length > 0) {
			var itemList = attributes.items.map(function(item) {
				return el(
					'div',
					{ className: 'item', 'data-index': item.index },
					el(
						'h1',
						{
							className: 'title',
						},
						item.title,
					),
				);
			});

			return el(
				'div',
				{ className: props.className },
				el('div', { className: 'item-list' }, itemList),
			);
		} else {
			return null;
		}
	},
});
