# Front-end build boilerplate

This is the starting point for all of my web projects and a combination of various front-end frameworks, the CSS side is loosely based on the popular framework [inuit.css](https://github.com/csswizardry/inuit.css) by [Harry Roberts](https://twitter.com/csswizardry).

## Requirements

- Node.js (Download and run the installer from [nodejs.org](http://nodejs.org))
- Grunt's command line interface (`sudo npm install -g grunt-cli`)
- Ruby (Download and run the installer from [ruby-lang.org](https://www.ruby-lang.org/en/downloads))
- Sass (`sudo gem install sass`)

## Installation

1. [Download](https://github.com/tomblanchard/boilerplate/archive/master.zip) or [clone](https://github.com/tomblanchard/boilerplate.git) the repo.
2. Execute the `grunt-dev.command` file, this deletes unneeded files and installs any Grunt dependencies if it needs to, then runs the default `grunt` task.

## Contents

### Automation

All automation is powered by [Grunt](http://gruntjs.com), it has one task `default`, when run the following happens:

- A local server is started at `http://localhost:9999`, using `site/` as the base, so you can view the project web pages / files as if you were on a live server.
- Sass files located in `src/scss/framework/` are compiled to `site/lib/css/`, if you're not familiar with Sass, think CSS on steroids.
- The CSS files compiled to `site/lib/css/` are then run through [Autoprefixer](https://github.com/ai/autoprefixer), this will automatically add browser prefixes to unsupported CSS properties.
- The file `src/js/main.js` is run through [UglifyJS](https://github.com/mishoo/UglifyJS) and gets outputted as `site/lib/js/main.min.js`, this minifies and squashes the outputted JS file as much as possible.
- Any `.html` files located in `site/` get deleted, so we start from a fresh set of pages each time the Grunt task is run.
- All  files located in `src/templates/` get run through [assemble](https://github.com/assemble/assemble) and compiled to `site/`, I use this for HTML partials, layouts etc. It allows me to carve my HTML up into reusable fragments: partials, includes, sections, snippets...
- Files get watched for changes, if changed their corresponding task will run again, if your browser is on the local server, it will auto-refresh the pages too, so you can see the changes without having to manually refresh every time.

### HTML

When working with the HTML only ever change / add / remove files in `src/templates/`, I use [assemble](https://github.com/assemble/assemble) for templating, assemble uses [Handlebars.js](https://github.com/wycats/handlebars.js) as it's default template library, so get familiar with the syntax:

#### [YAML front matter](http://assemble.io/docs/YAML-front-matter.html)

Each page needs a YAML front matter at the top of the file, there is only one necessary variable `title`, this gets used by the `src/templates/layouts/default.html` layout to output whatever is in each pages `title` variable in it's `<title />` element.

```html
---
title: Home
custom-variable: Custom variable
---

<div>
  <!--
    Outputs `Custom variable`.
    -->
  {{ custom-variable }}
</div>
```

#### Partials

You can include other files using partials, the example below would include the files contents from `src/templates/includes/_some-file.html`:

```html
{{> _some-file }}
```

#### If statements

You can check if variables exist like so:

```html
{{# if custom-variable }}
  The `custom-variable` is defined.
{{else}}
  The `custom-variable` is not defined.
{{/ if }}
```

These templates can have other HTML files included into them from `src/templates/includes/`, for example if you were to use `{{> _some-file.html }}` in any template this would include the file contents of `src/templates/includes/_some-file.html` into the current file you were working in. By default there is one page set up `index.html`, which has a few includes in there for a header, sidebar and footer, this can be changed however you want. Using includes just makes it easier to build static sites with common modules without repeating code.

These templates can have custom layouts they work from, these layouts are located in `src/templates/layouts/`. There is one default layout setup `default` (located `src/templates/layouts/default.html`), I use it to setup the HTML page skeleton (`<!DOCTYPE html>`, `<head />`, `<script />s` etc). The `default` layout will be used by every page by default, if you want to create and use another layout then create it `src/templates/layouts/custom-layout.html` and add `layout: custom-layout` to the page's [YAML front matter](http://assemble.io/docs/YAML-front-matter.html).

You might also notice the `src/templates/data/` directory and wonder what that is for, you can create JSON data objects here and use assemble to pull in data from it. For example if I were to setup the file `src/templates/data/me.json` with the file contents of `{ "name": "Tom Blanchard" }` I can output this data anywhere in my templates with `{{ me.name }}`.

You can find all the assemble documentation on the official [repo](https://github.com/assemble/assemble).

### Javascript

When working with custom (handwritten and not existing libraries) Javascript, only ever change / add / remove files in `src/js/`.

By default there is one file setup `main.js`, this just contains an [IIFE (immediately-invoked function expression)](http://toddmotto.com/what-function-window-document-undefined-iife-really-means) to help you get started straight away. This file gets compiled to `site/lib/js/main.min.js` every time its modified.

For any third party libraries such as jQuery place them in `site/lib/js/`.

### CSS

When working with CSS only ever change / add / remove files in `src/scss/` although never touch any files inside `src/scss/framework/`, bad things will happen.

The CSS side of this boilerplate is by far the most complicated part, I'll copy / paste an excerpt from the [inuit.css](https://github.com/csswizardry/inuit.css) docs as the same applies to this:

> It is a Sass based, Object Oriented framework that is full of objects and abstractions. inuit.css provides little-to-no design which means no undoing things, no deleting CSS and no adhering to other peoples’ design decisions.

> inuit.css is built on a [BEM](http://bem.info/)-style naming convention and honed based on [work done by Nicolas Gallagher](https://gist.github.com/1309546).

Below I'll walk you through what each file and directory is for:

#### `framework/`

Where all the default boilerplate's framework Sass lives.

#### `framework/base/`

Default base stuff such as minimal styling of elements like `<code>`, `<tables>` etc. Also contains styles which set the `<h1-6>` font-sizes, using the `$h[1-6]-size` variables set in `_config.scss`. There's no point in me listing each file in this directory as it's all simple, self-explanatory stuff.

#### `framework/generic/`

Element reset, normalize.css, box sizing etc.

#### `framework/generic/_box-sizing.scss`

Sets all element's `box-sizing` state to `border-box` if the `$global-border-box` config variable is set to true (which it is by default).

#### `framework/generic/_normalize.scss`

[Nicolas Gallagher](https://twitter.com/necolas)'s [normalize.css v3.0.1](https://github.com/necolas/normalize.css/).

#### `framework/generic/_reset.scss`

A more considered reset ([csswizardry.com/2011/10/reset-restarted](http://csswizardry.com/2011/10/reset-restarted)).

#### `framework/objects/`

All objects are throughly explained [here](http://tomblanchard.github.io/boilerplate).

Where all the default objects live. The way I author my CSS objects is a little different from the usual approach, instead of limiting the object from just being contained in a class (which limits usage to either a class in the HTML or the `@extend` directive in Sass) also have it in a mixin. For example this is what the `framework/objects/_sprite.scss` object looks like:

```scss
@mixin sprite {
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  width: 16px;
  height: 16px;
}

@if ( map-get( $objects, sprite ) ) {

  .sprite { @include sprite; }

}
```

If the object is enabled I can use this object like so:

```html
<span class="sprite"></span>
```

Or like this:

```scss
.element {
  @extend .sprite;
}
```

```html
<span class="element"></span>
```

Or like this:

```scss
.element {
  @media ( max-width: 500px ) {
    @include sprite;
  }
}
```

```html
<span class="element"></span>
```

This approach gets a little more complicated when it comes to more complex objects which contain modifier variations. I'll use parts of the `grid` object to illustrate the problem and my workaround. So with a few parts of the object taken out to save space this is what the `grid` object is like before my workaround:

```scss
/**
  Regular `grid` object.
 */
@mixin grid {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: -$grid-gutter;
  margin-bottom: -$grid-gutter;
}

  @mixin grid__item {
    display: inline-block;
    *display: inline;
    zoom: 1;
    padding-left: $grid-gutter;
    padding-bottom: $grid-gutter;
    vertical-align: top;
    width: 100%;
  }

/**
  `grid--small` modifier, extends the `grid` object, with a smaller gutter.
 */
@mixin grid--small {
  margin-left: -($grid-gutter / 2);
  margin-bottom: -($grid-gutter / 2);

  > .grid__item {
    padding-left: ($grid-gutter / 2);
    padding-bottom: ($grid-gutter / 2);
  }
}

/**
  If the `regular` version of the `grid` object is enabled then output the
  necessary CSS.
 */
@if map-deep-get( $objects, grid regular ) == true {

  .grid { @include grid; }

    .grid__item { @include grid__item; }

}

/**
  If the `small` version of the `grid` object is enabled then output the
  necessary CSS.
 */
@if map-deep-get( $objects, grid small ) == true {

  .grid--small { @include grid--small; }

}
```

This is fine if I `@extend` the object or use the normal `.grid` classes in my HTML, the problem arises when I want to `@include` the object into custom class names. Lets say I wanted to use the `grid` mixins, I'd do it like:

```scss
.content { @include grid; }

  .content__col { @include grid__item; }

.content--alt { @include grid--small; }
```

This outputs:

```css
.content {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: -24px;
  margin-bottom: -24px;
}

.content__col {
  display: inline-block;
  *display: inline;
  zoom: 1;
  padding-left: 24px;
  padding-bottom: 24px;
  vertical-align: top;
  width: 100%;
}

.content--alt {
  margin-left: -12px;
  margin-bottom: -12px;
}
.content--alt > .grid__item {
  padding-left: 12px;
  padding-bottom: 12px;
}
```

You see the `.content--alt > .grid__item` part? That's the problem, it should output to `.content--alt > .content__col`, it doesn't match what the DOM structure will look like, it's targeting the wrong child element. The HTML looks like this:

```html
<div class="content content--alt">
  <div class="content__col">Blah, blah, blah.</div><!--
  --><div class="content__col">Blah, blah, blah.</div><!--
  --><div class="content__col">Blah, blah, blah.</div>
</div>
```

My work around is to author the object like so:

```scss
@mixin grid {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: -$grid-gutter;
  margin-bottom: -$grid-gutter;
}

  @mixin grid__item {
    display: inline-block;
    *display: inline;
    zoom: 1;
    padding-left: $grid-gutter;
    padding-bottom: $grid-gutter;
    vertical-align: top;
    width: 100%;
  }

/**
  Now the `.grid__item` element is able to be changed via the `grid--small` mixin
  parameter `$grid__item`.
 */
@mixin grid--small ( $grid__item: '.grid__item' ) {
  margin-left: -($grid-gutter / 2);
  margin-bottom: -($grid-gutter / 2);

  > #{$grid__item} {
    padding-left: ($grid-gutter / 2);
    padding-bottom: ($grid-gutter / 2);
  }
}

@if map-deep-get( $objects, grid regular ) == true {

  .grid { @include grid; }

    .grid__item { @include grid__item; }

}

@if map-deep-get( $objects, grid small ) == true {

  .grid--small { @include grid--small; }

}
```

Then when I want to `@include` the object I do it like so:

```scss
.content { @include grid; }

  .content__col { @include grid__item; }

.content--alt { @include grid--small( $grid__item: '.content__col' ); }
```

#### `framework/objects/_flag.scss`

Very similar to the media object, however it give us control over the vertical alignments of the text and image. See [here](http://tomblanchard.github.io/boilerplate/#flag) for usage / notes examples etc.

#### `framework/objects/_flyout.scss`

Content that flys out of a parent when said parent is hovered. They typically appear bottom-left of the parent. See [here](http://tomblanchard.github.io/boilerplate/#flyout) for usage / notes examples etc.

#### `framework/objects/_grid.scss`

Simple, fluid, nestable, flexible grid system. See [here](http://tomblanchard.github.io/boilerplate/#grid) for usage / notes examples etc.

#### `framework/objects/_media.scss`

Place image and text-like content side-by-side. See [here](http://tomblanchard.github.io/boilerplate/#media) for usage / notes examples etc.

#### `framework/objects/_nav.scss`

Turn a list into a horizontal row of list items, mostly for use in navigation menus. See [here](http://tomblanchard.github.io/boilerplate/#nav) for usage / notes examples etc.

#### `framework/objects/_sprite.scss`

Turn elements into icons with a background image and no text. See [here](http://tomblanchard.github.io/boilerplate/#sprite) for usage / notes examples etc.

#### `framework/tools/`

Custom Sass functions and mixins live here.

#### `framework/tools/functions/`

Custom Sass functions.

#### `framework/tools/functions/map-deep-get.scss`

Like `map-get` but can handle multi-dimensional maps. Usage:

```scss
$colors: (
  element: (
    primary: red
  )
);

.element {
  color: map-deep-get( $colors, element primary );
}
```

#### `framework/tools/mixins/`

Custom mixins.

#### `framework/tools/mixins/_font-size.scss`

Create a fully formed type style (sizing and vertical rhythm) by passing in a single value. Usage:

```scss
.element {
  @include font-size( 10px );
}
```

This outputs:

```css
.element {
  font-size: 10px;
  font-size: 0.625rem;
  line-height: 2.4;
}
```

#### `framework/tools/mixins/_helpers.scss`

Simple helper mixins such as a clearfix solution, image replacement etc.

#### `framework/tools/mixins/_media-query.scss`

Output media query with dynamic content and query declaration, the declarations which can be used are defined in `$breakpoints` (located in `_config.scss`). This also comes with optional support for IE8 and below, set `$lt-ie-9-support` as `true` and it will output the CSS content inside the media query in the `lt-ie-9.min.css` file stripping the media query wrapped around it. Usage:

```scss
.element {
  @include media-query( L, true ) {
    background: red;
  }
}
```

In the compiled `site/lib/css/style.min.css`, this outputs:

```css
@media ( min-width: 1024px ) and ( max-width: 1139px ) {
  .element {
    background: red;
  }
}
```

In the compiled `site/lib/css/lt-ie-9.min.css`, this outputs:

```css
.element {
  background: red;
}
```

This mixin also has the alias `mq`, so instead of having to write `@include media-query( ... ) { }` every time (which can get tedious), you have the option of writing `@include mq( ... ) { }`. When I refer to this as an "alias", this means that it's powered off the original `media-query` mixin so works exactly the same, just with a different name, usage is completely optional.

#### `framework/tools/mixins/_spacing.scss`

Margin and padding helper mixins in the format of:

`.(m|p)(t|r|b|l|h|v)(-|+|0) {}` = margin/padding top/right/bottom/left/horizontal/vertical less/more/none.

I explain this in much more details later on, when I talk about the `$spacing` config variables.

#### `framework/tools/mixins/_unit-conversion.scss`

Convert units to other units.

`@function rem`: Convert `px` to `rem`.

`@function em`: Convert `px` to `em` with dynamic base `font-size`.

`@mixin rem`: Convert `px` to `rem` with a dynamic property with a `px`
fallback.

Usage:

```scss
.element {
  width: rem( 20px );
  height: em( 20px, 10px );
  @include rem( margin, 20px );
}
```

This outputs:

```css
.element {
  width: 0.83333rem;
  height: 2em;
  margin: 20px;
  margin: 0.83333rem;
}
```

#### `framework/trumps/`

High-specificity, very explicit selectors, the styles here are for overrides and helper classes.

#### `framework/trumps/_helpers.scss`

Outputs the helpers mixins defined in `framework/tools/mixins/_helpers.scss` to actual classes.

#### `framework/trumps/_spacing.scss`

Outputs the spacing mixins defined in `framework/tools/mixins/_spacing.scss` to actual classes, depending on which spacing variants are enabled in the `$spacing` config variable.

#### `framework/trumps/_widths.scss`

Outputs width classes (mostly used with the `grid` object). I explain this in much more details later on, when I talk about the `$custom-grid-widths` / `$grid-widths-to-output` config variables.

#### `framework/_base.scss`

Every partial gets imported into this file, starting with `_config.scss`, followed by custom functions, mixins, stuff in `framework/generic/`, stuff in `framework/base/`, stuff in `framework/objects/`, your custom project Sass located in `_style.scss` then finally stuff in `framework/trumps/`.

#### `framework/lt-ie-9.scss`

The lower than IE 9 Sass file, it sets the `$is-lt-ie-9-stylesheet` variable to `true` (so any time you use `@if $is-lt-ie-9-stylesheet == true { }` that code will only show up in this file) and imports `framework/_base.scss`. This file compiles to `site/lib/css/lt-ie-9.min.css`.

#### `framework/style.scss`

The default main Sass file, it sets the `$is-lt-ie-9-stylesheet` variable to `false` (so any time you use `@if $is-lt-ie-9-stylesheet == false { }` that code will only show up in this file) and imports `framework/_base.scss`. This file compiles to `site/lib/css/style.css`.

#### `ui/`

All of your project Sass should live here, nicely organised into lots of modular partials.

#### `_config.scss`

Where all of your settings live, this is basically one massive file of variables, some variables I won't need to explain to due their simplicity, for example `$global-border-box` resets every element's box model to `box-sizing: border-box`, `$base-*` variables control such things as font-sizes, spacing units etc.

It starts to get more complicated when you hit the `$objects` variable which is actually a Sass map which controls which default objects should get outputted into the compiled CSS (this boilerplate comes with some default objects such as a grids etc, there's no point in outputting every object if they're not going to be used, no-one likes code bloat). Most default objects do have various modifiers / variations which you can enable / disable as you please, for example if I wanted the `grid` object and the object variation `large` (which adds a wider gutter to the grid), the `$objects` variable would look like so:

```scss
$objects: (
  grid: (
    regular: true,
    small:   false,
    large:   true,
    rev:     false,
    flush:   false,
    middle:  false,
    bottom:  false,
    right:   false,
    center:  false
  ),
...
```

Next up on the settings file is the part which handles the responsive stuff. The `$breakpoints` variable contains a Sass map (this is used in a few different parts of the boilerplate) which should contain all the projects responsive breakpoints. By default I have a few breakpoints set up:

```scss
$breakpoint--S:  480px;
$breakpoint--M:  768px;
$breakpoint--L:  1024px;
$breakpoint--XL: 1140px;
```

Then I reference these variables in the `$breakpoints` map, I have a `S / M / L / XL` naming convention to my breakpoints. For example, the `L` breakpoint is a media query of `( min-width: 1024px ) and ( max-width: 1139px )`, the `L-down` breakpoint is a media query of `( max-width: 1023px )` and the `L-up` breakpoint is a media query of `( min-width: 1024px )`.

After the responsive stuff, comes the `grid` object width settings (on responsive grid-heavy sites there will be a lot of grid widths at specific media queries, this allows for much better organisation), these consist of three variables:

`$grid-gutter`:

Spacing between grid items, defaults to the value of `$base-spacing-unit`.

`$custom-grid-widths`:

The boilerplate comes with loads of grid widths already defined in `framework/trumps/_widths.scss`, these widths are fractions going from `one-whole` to `eleven-twelfths`, all-in-all they cover wholes, halves, thirds, quarters, fifths, sixths, sevenths, eighths, ninths, tenths, elevenths and twelfths. So if you want to add custom grid widths, you use this variable like so:

```scss
$custom-grid-widths: (
  width-class: 200px
);
```

`$grid-widths-to-output`:

Without the use of this variable no grid item widths would be outputted into the compiled CSS at all. This is a very powerful variable as it even controls breakpoint specific grid item widths, it uses the names of the breakpoints defined in the `$breakpoints` map, so I use it like so:

```scss
$grid-widths-to-output: (
  one-third
  width-class,
  M--one-half,
  XL-up--width-class
);
```

This outputs:

```css
.one-third {
  width: 33.333%;
}

.width-class {
  width: 200px;
}

@media ( min-width: 768px ) and ( max-width: 1023px ) {
  .M--one-half {
    width: 50%;
  }
}

@media ( min-width: 1140px ) {
  .XL-up--width-class {
    width: 200px;
  }
}
```

The last default variable in the settings file is `$spacing` which is a map very similar to the `$objects` map. The `$spacing` map controls which spacing helper classes (located at `framework/trumps/_spacing.scss`) get outputted into the compiled CSS.

After all the default variables you can go ahead and state any custom project variables such as colours, font stacks etc.

#### `_style.scss`

Import all of your project Sass partials from `ui/`.

### Any other assets

Place any other asstes (images, fonts etc) in their own directories in `site/lib/`, there are a couple of directories setup by default.

## Credits

The only reason my boilerplate exists is because I'm constantly learning and checking out other open-source projects and seeing what parts of it could added to this project, without the following people this boilerplate wouldn't exist:

- [Harry Roberts](https://twitter.com/csswizardry) for his amazing work on [inuit.css](https://github.com/csswizardry/inuit.css).
- [Todd Motto](https://twitter.com/toddmotto), learning from his Grunt setup on [FireShell](https://github.com/toddmotto/fireshell) has made my automation a breeze.
- [Nicolas Gallagher](https://twitter.com/necolas) for the holy trinity which is [normalize.css](https://github.com/necolas/normalize.css/).

You guys are awesome.