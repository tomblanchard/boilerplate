# Personal boilerplate

This is the starting point for all of my web projects and a combination of various front-end frameworks.

## Installation

1. [Download](https://github.com/tomblanchard/boilerplate/archive/master.zip) or [clone](https://github.com/tomblanchard/boilerplate.git) the repo
2. Execute the `grunt-dev.command` file, this installs any Grunt dependencies if it needs to then runs the default `grunt` task

## Credits

Credit to [Harry Roberts](https://twitter.com/csswizardry), [Todd Motto](https://twitter.com/toddmotto) and [Nicolas Gallagher](https://twitter.com/necolas), you guys are awesome.

## Features

### Objects

All default objects are located in `src/scss/framework/objects`, they are authored in such a way that they can be used as Sass mixins and / or regular CSS classes (if `$use-{object}` is enabled in `src/scss/framework/_config.scss`).

Some mixins rely on nested selector like so:

```scss
@mixin object--modifier {
  color:red;

  > .object__sub-component {
    color:blue
  }
}
```

So if I wanted to use the `object--modifier` mixin with a different name like so I'd do:

```scss
.custom-object--modifier {
  @include object--modifier;
}
```

My markup would be like so:

```html
<div class="custom-object--modifier">
  <div class="custom-object__sub-component">
    Text.
  </div>
</div>
```

This doesn't work as it outputs the following CSS:

```css
.custom-object--modifier {
  color:red;

}

  .custom-object--modifier > .object__sub-component {
    color:blue
  }
```

What it should output is:

```css
.custom-object--modifier {
  color:red;
}

  .custom-object--modifier > .custom-object__sub-component {
    color:blue
  }
```

To solve this I author my mixins which contain nested selectors like so:

```scss
@mixin object--modifier($prefix: '', $object__sub-component: object__sub-component) {
  color:red;

  > .#{$prefix}#{$object__sub-component} {
    color:blue
  }
}
```

Now when I want to use the mixin with a custom prefix to the name I do the following:

```scss
.custom-object--modifier {
  @include object--modifier($prefix: custom-);
}
```

Or if I want to give the object a different name entirely I can do:

```scss
.header--modifier {
  @include object--modifier($object__sub-component: header__nav);
}
```