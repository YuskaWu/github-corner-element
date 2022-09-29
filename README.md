# github-corner-element

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/github-corner-element)
[![npm](https://img.shields.io/npm/v/github-corner-element)](https://www.npmjs.com/package/github-corner-element)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/github-corner-element)

A web component for the corner banner of GitHub, inspired by [Tim Holman](https://github.com/tholman)'s [GitHub Corners](https://github.com/tholman/github-corners).

[Demo](https://yuskawu.github.io/github-corner-element/example)

## Browser Compatibility

It's compatible with browsers which supports [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components)(including `Custom elements`, `Shadow DOM` and `HTML Template`). For modern browsers it should be fine, but old browser may not work. Checkout the compatibility [here](https://caniuse.com/?search=web%20component).

## Installations

Use npm command to install pacakge:

```bash
npm install github-corner-element
```

Then import it directly in your app entry to register `github-corner` element:

```javascript
// register `github-corner` element in the entry file
import 'github-corner-element'
```

Alternatively, you can load from [UNPKG](https://unpkg.com/) CDN as well:

```html
<!-- latest version -->
<script src="https://unpkg.com/github-corner-element"></script>
<!-- specific version -->
<script src="https://unpkg.com/github-corner-element@1.0.0"></script>
<!-- load in ES Module mode -->
<script type="module" src="https://unpkg.com/github-corner-element/dist/github-corner-element.es.js"></script>
```

## Usage

After installation you can use it as well as a normal HTML element:

```html
<github-corner href="https://github.com/YuskaWu/github-corner-element"></github-corner>
```

## Attributes

In addition to the [global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), you can also use
the following additional attributes on `github-corner` element:

| Attribute Name | Type | Default Value | Description |
|-------------|----|-------------|-------------|
| href | [href attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) of anchor element | none | The URL of github page. |
| size | value of [width CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/width)  | 5rem | The width and height of github-corner element. |
| placement | 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' | 'top-right' | The placement of github-corner element, it can be one of the four corners. |
| octocat-color | value of [color CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/color) | white | The color of the octocat. |
| banner-color | value of [color CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/color) | black | The color of the banner. |
| wave-duration | value of [animation-duration CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration) | 0.5s | The duration to wave octocat's hand. |

Checkout this [page](https://yuskawu.github.io/github-corner-element/example) for more examples.

## Styling

As normal HTML element, you can style it with `class` and `style` attribute. But if you want to style elements which is inside the shadow DOM, then you have to use [::part()](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) CSS pseudo-element.

There are five parts in shadow DOM that can be selected by [::part()](https://developer.mozilla.org/en-US/docs/Web/CSS/::part):

- anchor
- banner
- octocat
- octocat-arm
- octocat-body

You can use devtool to inspect shadow DOM and checkout the position of these parts.

Here is an example to style the parts inside shadow DOM(see live demo [here](https://yuskawu.github.io/github-corner-element/example#ex-styling)):

```html
<style>
  .custom-style::part(banner) {
    fill: #cceb34;
    stroke: #d453f5;
    stroke-width: 16;
    transition: fill 0.2s;
  }

  .custom-style:hover::part(banner) {
    fill: white;
  }

  .custom-style::part(octocat) {
    fill: #d453f5;
    stroke: black;
    stroke-width: 3;
  }

  .custom-style::part(octocat-arm) {
    animation-name: wave-hand;
    animation-duration: 0.2s;
    animation-iteration-count: infinite
  }
</style>
...
<github-corner class="custom-style"></github-corner>
```

> NOTE: Using this way will have more specificity, styling by the attributes listed above will be overwritten.

## svg slot

There is a [slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) named `"svg"`, SVG element on the slot will be cloned and append into the SVG container inside shadow DOM. If you want to add additional SVG to draw something special, or you want to define SVG gradients, you can use the slot to do so.

Here is an example to draw eyes on octocat(see live demo [here](https://yuskawu.github.io/github-corner-element/example#ex-slot-eyes)):

```html
<github-corner>
  <svg slot="svg">
    <circle cx="160" cy="75" r="4" fill="black" />
    <circle cx="160" cy="75" r="6" stroke="black" fill="transparent" />
    <circle cx="180" cy="95" r="4" fill="black" />
    <circle cx="180" cy="95" r="6" stroke="black" fill="transparent" />
  </svg>
</github-corner>
```

> NOTE: You can only put an SVG element on the slot, other elements will be ignored.

## License

MIT
