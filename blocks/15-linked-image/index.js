import classnames from 'classnames';
import icons from './icons';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { URLInput, Editable, MediaUpload } = wp.editor;
const { IconButton, Tooltip, TextControl, Button } = wp.components;

export default registerBlockType('jsforwpblocks/linked-image', {
	title: __('Linked Image '),
	description: __('An Image which can be linked to another page'),
	category: 'common',
	icon: 'dashicons-format-image',
	keywords: [__('Image', 'jsforwpblocks'), __('Linked Image', 'jsforwpblocks')],
	attributes: {
		imageURL: {
			type: 'string',
			source: 'attribute',
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
		url: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: 'a',
		},
	},
	edit: props => {
		const {
			attributes: { imgID, imgURL, imgAlt, url },
			className,
			setAttributes,
			isSelected,
		} = props;
		const onSelectImage = img => {
			setAttributes({
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt,
			});
		};
		const onRemoveImage = () => {
			setAttributes({
				imgID: null,
				imgURL: null,
				imgAlt: null,
			});
		};
		return (
			<div>
				<URLInput value={url} onChange={url => setAttributes({ url })} />

				{!imgID ? (
					<MediaUpload
						onSelect={onSelectImage}
						type="image"
						value={imgID}
						render={({ open }) => (
							<Button className={'button button-large'} onClick={open}>
								{icons.upload}
								{__(' Upload Image', 'jsforwpblocks')}
							</Button>
						)}
					/>
				) : (
					<p class="image-wrapper">
						<img src={imgURL} alt={imgAlt} />

						{isSelected ? (
							<Button className="remove-image" onClick={onRemoveImage}>
								{icons.remove}
							</Button>
						) : null}
					</p>
				)}
			</div>
		);
	},
	save: props => {
		const { imgURL, imgAlt, url } = props.attributes;
		return (
			<a href={url}>
				<img src={imgURL} alt={imgAlt} />
			</a>
		);
	},
});
