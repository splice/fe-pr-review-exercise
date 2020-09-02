# Angular Component Guidelines

There are many approaches to every facet of how a component is built. The goal of this document is to explicitly state the approach we take here at Splice. This document should be considered a living document.

Our guidelines and standards will change over time as this team gains expertise, and as the underlying technology changes.

## Prefer Stateless Components

General purpose components are _stateless components_. Stateless components maintain little to no business logic and have no awareness of their context or the application they're running in. When a component is stateless it can be more easily reused across an application or even many applications.

Stateless components take inputs as configuration and reflecting them as rendered UI. Events which occur within or on the component are broadcasted out through outputs.

**✅ Do**

```html
<sp-like [check]="pack.liked" (change)="handleChange($event)">
```

**🚫 Don't**

```html
<sp-like [pack]="pack">
```

**Why?**

The first component can be used to reflect and modify the "liked" state of any kind of entity within our system, and can be used in the context of any application.

The second component must have awareness of the thing being liked and how to manage the liked state of the thing. In order to do this it has to carry around knowledge of both the entity and the system for modifying state. This makes it difficult to use this component for multiple types of entities (it would have to know how to access the liked state of any entity it's given), as well as references to services for modifying liked state for every kind of entity. This component is almost impossible to share across applications and would require complex dependency injection configurations.


## Component Inputs are Flat Values, Not Complex Objects

**✅ Do**

```html
<sp-product [title]="pack.title" [imagePath]="pack.imagePath">
```

**🚫 Don't**

```html
<sp-product [pack]="pack">
```

The first component can easily present a generalized "product", regardless of the shape of that product entity. This makes the component capable of living into the future for presenting entities we haven't even thought of yet. Importantly, the component has no awareness of our models – it's inputs are flat literal values. Our domain model can change in any way and this components will continue to work without refactoring.

The second component takes a `pack`. In order to introduce a new class of product – a Drum Rack, for instance – we would have to refactor the component to understand this new shape. And importantly, this assumes the component has information about our models. This means we either have to duplicate our model definitions as local TypeScript models OR we have to complicate our dependency tree by making our Design System depend on GraphQL.


## Expose Declarative APIs

We prefer declarative component APIs. This is because declarative APIs allow an engineer to think declaratively about UI state. In this paradigm the work of the controller is to determine truth and store that truth in state. State is bound to the view (markup) and the result is the markup presented to users.

**✅ Do**

```html
<sp-modal *ngIf="isModalOpen">...</sp-modal>
```

The modal will be open if `isModalOpen` is `true`. The internals of _how_ it is shown is handled internally to the component.

**🚫 Don't**

```ts
class SomeComponent ... {
  handleOpenClick() {
    this.modalService.open(MyModalComponent)
  }
  handleCloseClick() {
    this.modalService.close(MyModalComponent)
  }
}
```

Here we are imperatively controlling the modal, which forces our controller to have to micro-manage the presentation logic. It's entirely reasonable for the _modal itself_ to use imperative code like this, but users of the modal shouldn't have to.

**Why?**

_Declarative_ APIs allow us to manage component UI like arbitrary HTML markup, and this is a very straight forward development model. Declarative APIs allow controllers to focus on determining state, leaving the responsibility for presentation entirely to the view which can reflect that state. When we opt for _imperative_ APIs we split presentational control between both the controller and the view.

_Declarative_ APIs are composable. With the first component we can have a generalized `<sp-modal>` element which can accept arbitrary ContentChild markup: `<sp-modal>Hello!</sp-modal>`. The second approach would require us to create a distinct modal component, likely inheriting from some base component class, which them implements our required content, and of which we can send to our service. The imperative approach requires much more work to implement because it is not based on composable markup.

## Configure Presentation Through Inputs (aka Props), Not CSS

A component's `@Input()` properties should expose all presentational configuration for a component. CSS classes are _not_ a component API.

**✅ Do**

```html
<button spButton variant="primary" size="small">Submit</button>
```

**🚫 Don't**

```html
<button spButton class="btn-primary btn-small">Submit</button>
```

**Why?**

Inputs provide a clear API which _guides usage_. It is very difficult to guide usage through CSS classes.

For example, say you have both "primary" and "danger" variants. The "primary" variant is blue and is meant to be the main button on a form. The "danger" variant is red and signifies a destructive operation. When limited to CSS it would be reasonable to apply the "primary" class to a form where the primary action is destructive: `<button class="primary danger">`. There's no way to tell from the class names that "primary" and "danger" are _mutually exclusive_. The result is that the CSS for those two classes is going to fight, and the resulting display will depend on things such as the order of the CSS was declared in your stylesheets.

When we use inputs as the presentational API we can be clear about this:

```ts
class ButtonComponent {
  @Input()
  variant: 'primary' | 'danger';
}
```

Now there is _no way_ to run into this problem. The button must be ONE of the two variants, not both:

```html
<button spButton variant="danger">
```


## Prefer Native Markup with Directive Attributes over Custom Elements

Wherever possible prefer attribute directives over custom element directives.

**✅ Do**

```html
<button spButton></button>
```

**🚫 Don't**

```html
<sp-button></sp-button>
```

**Why?**

HTML is a markup language with a great number of features exposed through HTML attributes. Importantly, these include attribute which drive accessibility, among other concerns.

When we use attribute directives on built-in HTML elements we leave all of the native HTML capabilities of those elements exposed and accessible to the engineer without additional effort.

When we wrap native elements with custom HTML element directives we have to specifically provide some mechanism for setting those attributes on our wrapped elements. Often this would mean specifically copying those values from the host element down to the view child element. This is a labor-intensive and fraught process where it's easy to not implement features and to introduce bugs.


## Make use of the component's `:host` element

An Angular component has a wrapping element as defined in your class:

```ts
@Component({
  selector: 'sp-sidebar',
  ...
})
export class SidebarComponent implements ... { }
```

Because of this we do NOT need to wrap the markup within the component's template with an additional wrapping element - all of our component's markup is _already_ wrapped.

**✅ Do**

```html
<strong>This is my component's template content!</strong>
```

**🚫 Don't**

```html
<div class="sp-my-component">
  <strong>This is my component's template content!</strong>
</div>
```

**Why?**

One reason is that it's less code - the wrapping element is extra bloat added to the page with no actual value.

Another reason is that the extra element can may your layout more complicated. A good example of this is if the component is within an element which is using `display: flex` or `display: grid`. The extra element may force you to add additional CSS to get your wrapping element to fill the host element's layout as expected.


## Use `OnPush` Change Detection

In almost all cases we use `ChangeDetectionStrategy.OnPush` in our components. This helps keep our UI elements from constantly rendering, which has been a common problem associate with Splice/Web because of it's hybrid use of Angular + AngularJS.

**✅ Do**

```ts
@Component({
  selector: 'sp-foo',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooComponent implements ... { }
```

**🚫 Don't**

```ts
@Component({
  selector: 'sp-foo',
  changeDetection: ChangeDetectionStrategy.Default
})
export class FooComponent implements ... { }

@Component({
  selector: 'sp-foo'
  // changeDetection omitted :(
})
export class FooComponent implements ... { }
```


## Directive Naming Conventions

Use `kebab-case` for _element_ directives and `camelCase` for _attribute_ directives.

**✅ Do**

```html
<sp-foo *spBar [spBaz]="1337"></sp-foo>
```

**🚫 Don't**

```html
<spFoo *sp-bar [sp-baz]="1337"></sp-foo>
```

**Why?**

This follows common Angular guidelines.
