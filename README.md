# Personal boilerplate

This is the starting point for all of my web projects and a combination of various front-end frameworks, the CSS side is loosely based on the popular framework [inuit.css](https://github.com/csswizardry/inuit.css) by [Harry Roberts](https://twitter.com/csswizardry).

## Contents

### Automation

All automation is powered by [Grunt](http://gruntjs.com), it has one task `default`, when run the following happens:

- A server is started at `http://localhost:9999`, using `site/` as the base.
- Sass files located in `src/scss/framework/` are compiled to `site/lib/css/`
- The CSS compiled to `site/lib/css/` are then run through [Autoprefixer](https://github.com/ai/autoprefixer), this will automatically add browser prefixes to unsupported CSS properties
- The file `src/js/main.js` is run through [UglifyJS](https://github.com/mishoo/UglifyJS) and gets outputted as `site/lib/js/main.min.js`
- Any `.html` files located in `site/` get deleted
- Any `.html` files located in `src/templates/` get compiled to `site/`
- Files get watched for changes, if changed their task gets run again

### HTML

When working with the HTML only ever change / add / remove files in `src/templates/`. These templates can have other HTML files included into them from `src/templates/includes/`, for example if you were to use `{% include "_some-file.html" %}` this would include the file contents of `src/templates/includes/_some-file.html` into the current file you were working in.

By default there is one page set up `index.html`, which has a few `include`s in there for a header, sidebar and footer, this can be changed however you want. Using `include`s just makes it easier to build static sites with common modules without repeating code.

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

##### `framework/`

Where all the default boilerplate's framework Sass lives.

##### `framework/base/`

Default base stuff such as minimal styling of elements like `<code>`, `<tables>` etc. Also contains styles which set the `<h1-6>` font-sizes, using the variables set in `_config.scss`.

##### `framework/generic/`

Where stuff such as resets and normalize.css live.

##### `framework/generic/functions/`

Custom Sass functions.

##### `framework/generic/functions/multi-map-get.scss`

Like `map-get` but can handle multi-dimensional maps. Usage:

```scss
$colors: (
  element: (
    primary: red
  )
);

.element {
  color: multi-map-get( $colors, element primary );
}
```

##### `framework/generic/mixins/`

Custom mixins.

##### `framework/generic/mixins/_font-size.scss`

Create a fully formed type style (sizing and vertical rhythm) by passing in a single value. Usage:

```scss
.element {
  @include font-size(10px);
}
```

##### `framework/generic/mixins/_media-query.scss`

Output media query with dynamic content and query declaration, the declarations which can be used are defined in `$breakpoints` (located in `_config.scss`). This also comes with optional support for IE8 and below, set `$lt-ie-9-support` as `true` and it will output the CSS content inside the media query in the `lt-ie-9.min.css` file stripping the media query wrapped around it. Usage:

```scss
.element {
  @include media-query( L, true ) {
    background: red;
  }
}
```

##### `framework/generic/mixins/_unit-conversion.scss`

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

##### `framework/generic/_grid-width-builder.scss`

Generate width classes (mostly used with the `grid` object). I explain this in much more details later on, when I talk about the `$custom-grid-widths` / `$grid-widths-to-output` config variables.

##### `framework/generic/_helpers.scss`

Helpers which can be used via a normal HTML class, Sass `@extend`, and / or mixin (enable use inside of media queries), usage:

```html
<div class="helper"></div>
```

```scss
.element {
  @extend .helper;

  @media ( max-width: 500px ) {
    @include helper;
  }
}
```

##### `framework/generic/_normalize.scss`

[Nicolas Gallagher](https://twitter.com/necolas)'s [normalize.css](https://github.com/necolas/normalize.css/).

##### `framework/generic/_reset.scss`

A more considered reset ([csswizardry.com/2011/10/reset-restarted](http://csswizardry.com/2011/10/reset-restarted)).

##### `framework/generic/_spacing.scss`

Margin and padding helper classes in the format of:

`.(m|p)(t|r|b|l|h|v)(-|+|0) {}` = margin/padding top/right/bottom/left/horizontal/vertical less/more/none.

I explain this in much more details later on, when I talk about the `$spacing` config variables. , usage:

```html
<div class="m"></div>
```

```scss
.element {
  @extend .m;

  @media ( max-width: 500px ) {
    @include m;
  }
}
```

##### `framework/objects/`

Where all the default objects live. The way I author my CSS objects is a little different from the usual approach, instead of limiting the object from just being contained in a class (which limits usage to either a class in the HTML or the `@extend` directive in Sass) also have it in a mixin. For example this is what the `framework/objects/_bare-list.scss` object looks like:

```scss
@mixin bare-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

@if map-get( $objects, bare-list ) == true {

  .bare-list { @include bare-list; }

}
```

If the object is enabled I can use this object like so:

```html
<ul class="bare-list"></ul>
```

```scss
.element {
  @extend .bare-list;

  @media ( max-width: 500px ) {
    @include bare-list;
  }
}
```

This approach gets a little more complicated when it comes to more complex objects which contain modifier variations. I'll use parts of the `grid` object to illustrate the problem and my workaround. So with a few parts of the object taken out to save space this is what the `grid` object is like before my workaround:

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
    padding-left: $grid-gutter;
    padding-bottom: $grid-gutter;
    vertical-align: top;
    width: 100%;
  }

@mixin grid--small {
  margin-left: -($grid-gutter / 2);
  margin-bottom: -($grid-gutter / 2);

  > .grid__item {
    padding-left: ($grid-gutter / 2);
    padding-bottom: ($grid-gutter / 2);
  }
}

@if multi-map-get( $objects, grid regular ) == true {

  .grid { @include grid; }

    .grid__item { @include grid__item; }

}

@if multi-map-get( $objects, grid small ) == true {

  .grid--small { @include grid--small; }

}
```

This is fine if I `@extend` the object or the normal `.grid` classes, the problem arises when I want to `@include` the object into custom class names. Lets say I wanted to use the `grid` mixins, I'd do it like:

```scss
.content { @include grid; }

.content--alt { @include grid--small; }

  .content__col { @include grid__item; }
```

This outputs:

```css
.content {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: -$grid-gutter;
  margin-bottom: -$grid-gutter;
}

.content--alt {
  margin-left: -12px;
  margin-bottom: -12px;
}
.content--alt > .grid__item {
  padding-left: 12px;
  padding-bottom: 12px;
}

.content__col {
  display: inline-block;
  padding-left: $grid-gutter;
  padding-bottom: $grid-gutter;
  vertical-align: top;
  width: 100%;
}
```

You see the `.content--alt > .grid__item` part? That's the problem, it should output to `.content--alt > .content__col`, it doesn't match what the DOM structure will look like, it's targeting the wrong child element. The HTML looks like this:

```html
<div class="content content--alt">
  <div class="content__col">Blah, blah, blah.</div>
  <div class="content__col">Blah, blah, blah.</div>
  <div class="content__col">Blah, blah, blah.</div>
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
    padding-left: $grid-gutter;
    padding-bottom: $grid-gutter;
    vertical-align: top;
    width: 100%;
  }

@mixin grid--small( $grid__item:  grid__item ) {
  margin-left: -($grid-gutter / 2);
  margin-bottom: -($grid-gutter / 2);

  > .#{$grid__item} {
    padding-left: ($grid-gutter / 2);
    padding-bottom: ($grid-gutter / 2);
  }
}

@if multi-map-get( $objects, grid regular ) == true {

  .grid { @include grid; }

    .grid__item { @include grid__item; }

}

@if multi-map-get( $objects, grid small ) == true {

  .grid--small { @include grid--small; }

}
```

Then when I want to `@include` the object I do it like so:

```scss
.content { @include grid; }

.content--alt { @include grid--small( $grid__item: content__col ); }

  .content__col { @include grid__item; }
```

##### `framework/objects/_bare-list.scss`

Removes indents and bullet points from lists.

##### `framework/objects/_flag.scss`

Very similar to the media object, however it give us control over the vertical alignments of the text and image.

##### `framework/objects/_flyout.scss`

Content that flys out of a parent when said parent is hovered. They typically appear bottom-left of the parent.

##### `framework/objects/_grid.scss`

Simple, fluid, nestable, flexible grid system.

##### `framework/objects/_media.scss`

Place image and text-like content side-by-side.

##### `framework/objects/_nav.scss`

Turn a list into a horizontal row of list items, mostly for use in navigation menus.

##### `framework/objects/_sprite.scss`

Turn elements into icons with a background image and no text.

##### `framework/_base.scss`

Every partial gets imported into this file, starting with `_config.scss`, followed by custom functions, mixins, stuff in `framework/generic/`, stuff in `framework/base/`, stuff in `framework/objects/` then finally your custom project Sass located in `_style.scss`.

##### `framework/lt-ie-9.scss`

The lower than IE 9 Sass file, it sets the `$is-lt-ie-9-stylesheet` variable to `true` (so any time you use `@if $is-lt-ie-9-stylesheet == true { }` that code will only show up in this file) and imports `framework/_base.scss`. This file compiles to `site/lib/css/lt-ie-9.min.css`.

##### `framework/style.scss`

The default main Sass file, it sets the `$is-lt-ie-9-stylesheet` variable to `false` (so any time you use `@if $is-lt-ie-9-stylesheet != true { }` that code will only show up in this file) and imports `framework/_base.scss`. This file compiles to `site/lib/css/style.css`.

##### `ui/`

All of your project Ssass should live here, nicely organised into lots of modular partials.

##### `_config.scss`

Where all of your settings live, this is basically one massive file of variables, some variables I won't need to explain to due their simplicity, for example `$global-border-box` resets every element's box model to `box-sizing: border-box`, `$base-*` variables control such things as font-sizes, spacing units etc.

It starts to get more complicated when you hit the `$objects` variable which is actually a Sass map which controls which default objects should get outputted into the compiled CSS (this boilerplate comes with some default objects such as a grids etc, there's no point in outputting every object if they're not going to be used). Most default objects do have various modifiers / variations which you can enable / disable as you please, for example if I wanted the `grid` object and the object variation `large` (which adds a wider gutter to the grid), the `$objects` variable would look like so:

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

Next up on the settings files is the part which handles the responsive stuff. The `$breakpoints` variable contains a Sass map (this is used in a few different parts of the boilerplate, I'll touch in this later) which should contain all the projects responsive breakpoints. By default I have a few breakpoints set up:

```scss
$breakpoint--S:  480px;
$breakpoint--M:  768px;
$breakpoint--L:  1024px;
$breakpoint--XL: 1140px;
```

Then I reference these variables in the `$breakpoints` map, I have a `S / M / L / XL` naming convention to my breakpoints. For example, the `L` breakpoint is a media query of `(min-width: 1024px) and (max-width: 1139px)`, the `L-down` breakpoint is a media query of `(max-width: 1023px)` and the `L-up` breakpoint is a media query of `(min-width: 1024px)`.

After the responsive stuff, comes the `grid` object settings, these consist of three variables:

`$grid-gutter`:

Spacing between grid items, defaults to the value of `$base-spacing-unit`.

`$custom-grid-widths`:

The boilerplate comes with loads of grid widths already defined in `framework/generic/_grid-width-builder.scss`, these widths are fractions going from `one-whole` to `eleven-twelfths`, all in all they cover wholes, halves, thirds, quarters, fifths, sixths, sevenths, eighths, ninths, tenths, elevenths and twelfths. So if you want to add custom grid widths, you use this variable like so:

```scss
$custom-grid-widths: (
  width-class: 200px
);
```

`$grid-widths-to-output`:

Without the use of this variable no grid item widths would be outputted into the compiled CSS at all. This is a very powerful variable as it even controls media query specific grid item widths, it uses the names of the media queries defined in the `$breakpoints` map, so I use it like so:

```scss
$grid-widths-to-output: (
  one-third
  width-class,
  M--one-half,
  XL-up--width-class
);
```

This outputs the following:

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

The last default variable in the settings file is `$spacing` which is map very similar to the `$objects` map. The `$spacing` map controls which spacing helper classes (located at `framework/generic/_spacing.scss`) get outputted into the compiled CSS.

After all the default variables you can go ahead and state any custom project variables such as colours, font stacks etc.

##### `_style.scss`

Import all of your project Sass partials from `ui/`.

### Any other assets

Place any other asstes (images, fonts etc) in their own directories in `site/lib/`.

## Installation

1. [Download](https://github.com/tomblanchard/boilerplate/archive/master.zip) or [clone](https://github.com/tomblanchard/boilerplate.git) the repo
2. Execute the `grunt-dev.command` file, this installs any Grunt dependencies if it needs to then runs the default `grunt` task

## Credits

The only reason my boilerplate exists is because I'm constantly learning and checkout out other open-source projects and seeing what parts of it could added to this project, without the following people this boilerplate wouldn't exist:

- [Harry Roberts](https://twitter.com/csswizardry) for his amazing work on [inuit.css](https://github.com/csswizardry/inuit.css)
- [Todd Motto](https://twitter.com/toddmotto), learning from his Grunt setup on [FireShell](https://github.com/toddmotto/fireshell) has made my automation a breeze
- [Nicolas Gallagher](https://twitter.com/necolas) for the holy trinity which is [normalize.css](https://github.com/necolas/normalize.css/)

You guys are awesome.