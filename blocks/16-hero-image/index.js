import classnames from 'classnames';
// import icon from './icon';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { URLInput, Editable, MediaUpload } = wp.editor;
const { IconButton, Tooltip, TextControl, Button } = wp.components;

export default registerBlockType('jsforwpblocks/hero-image', {
	title: __('Hero Image'),
	description: __('An Hero Image with title'),
	category: 'common',
	icon: 'dashicons-admin-comments',
	keywords: __('Hero image', 'jsforwpblocks'),
	attributes: {
		imgURL: {
			type: 'string',
			soruce: 'attribute',
			attribute: 'src',
			selector: 'img',
		},
		imgID: {
			type: 'number',
		},
		imgAlt: {
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
			selector: 'img',
		},
		title: {
			type: 'string',
			source: 'text',
			selector: 'h2',
		},
	},
	edit: props => {
		const {
			attributes: { imgURL, imgID, imgAlt, title },
			className,
			isSelected,
			setAttributes,
		} = props;

		const onSelectImage = img => {
			setAttributes({
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt,
			});
		};
		const onRemoveImage = img => {
			setAttributes({
				imgID: null,
				imgURL: null,
				imgAlt: null,
			});
		};
		return (
			<div className={className}>
				<TextControl
					id="example-input-field"
					label={__('Title Text', 'jsforwpblocks')}
					value={title}
					onChange={title => setAttributes({ title })}
				/>
				{!imgID ? (
					<MediaUpload
						onSelect={onSelectImage}
						type="image"
						value={imgID}
						render={({ open }) => (
							<Button className="button button-large" onClick={open}>
								Upload Image
							</Button>
						)}
					/>
				) : (
					<p class="image-wrapper">
						<img src={imgURL} alt={imgAlt} />
						{isSelected ? (
							<Button className="remove-image" onClick={onRemoveImage}>
								Remove Image
							</Button>
						) : null}
					</p>
				)}
			</div>
		);
	},
	save: props => {
		const { imgURL, title } = props.attributes;
		const backgroundImg = {
			backgroundImage: `url(${imgURL})`,
		};
		return (
			<div>
				<div class="hero-image__background" style={backgroundImg}>
					<div class="hero-image__overlay"> </div>
					<h2>{title}</h2>
				</div>
			</div>
		);
	},
});
