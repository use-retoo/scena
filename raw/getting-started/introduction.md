# Introduction

> Lightweight embeddable widget for adding video reels to any website.

## What is Scena?

Scena is an embeddable video widget designed to bring short-form video reels directly onto your website. The widget mounts as a floating overlay on top of your page — similar to what you see on social media platforms, but fully under your control.

Scena works on any type of site — landing pages, e-commerce stores, SaaS dashboards — without redirecting visitors elsewhere. The widget ships with configurable video playback, multiple visual shapes, a preview mode, and built-in interactive elements like a CTA button and a close control.

Built with [Svelte 5](https://svelte.dev), Scena compiles down to vanilla JavaScript with no framework runtime. The output integrates into React, Vue, Angular, or plain HTML without dependency conflicts. Distribution formats include ES Module, UMD, and CommonJS.

<callout color="info">

Scena is a fully open-source, non-commercial project. It's built and maintained by a small team in their free time with the goal of helping developers build better projects. If you encounter bugs or rough edges — we'd appreciate your patience and a [GitHub issue](https://github.com/use-retoo/scena) over frustration.

</callout>

## See it in action

The only required field is `video.src` — everything else has sensible defaults. Placement and shape determine how the widget integrates into your page.

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":{"text":"Get in touch"},"closeButton":{}}">



</scena-component>
</scena-container>

```ts
const instance = await scena.mount({
  video: { src: '/video.mp4', autoplay: false },
  size: ComponentSize.MD,
  shape: ComponentShape.CIRCLE,
  container: {
    position: ComponentPosition.ABSOLUTE,
    placement: ComponentPlacement.MIDDLE_CENTER,
  },
  ctaButton: { text: 'Get in touch' },
});
```

<callout icon="i-lucide-settings-2" to="/examples/basic-setup">

See the **Basic Setup** example to explore the full config in practice — an interactive panel lets you tweak every parameter live and observe how the widget responds without writing a single line of code.

</callout>

## Features

<field-group>
<field name="Video playback" type="autoplay, loop, mute, poster, seek, volume">

Full control over the video element — configure on mount or change at runtime through the controller API.

</field>

<field name="Shapes & sizes" type="circle, square, portrait, landscape">

Multiple aspect ratios with predefined size presets. Combine any shape with any size.

</field>

<field name="CTA button" type="configurable">

Built-in call-to-action overlay with customizable text, styling, and a dedicated click event.

</field>

<field name="Preview mode" type="configurable">

Compact preview state that expands to the full widget on interaction.

</field>

<field name="Event system" type="subscribe / unsubscribe">

Typed events for playback changes, user interactions, and lifecycle hooks — connect analytics, navigation.

</field>

<field name="Runtime updates" type="mergeConfig / setConfig">

Patch or replace the entire config without unmounting.

</field>
</field-group>

## Bundle size

The production bundle weighs under **30 KB gzipped** (JS + CSS combined). Zero runtime dependencies — nothing is loaded beyond the video source you provide.

<callout icon="i-lucide-arrow-right" to="/distribution/bundle-size">

Full breakdown by format in the **Bundle Size** reference.

</callout>
