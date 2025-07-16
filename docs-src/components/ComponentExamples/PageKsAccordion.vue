<template>
    <div>
        <div class="row col">
            <ks-accordion>
                <ks-accordion-row title="Row 1">
                    <div slot="actions">
                        <ks-action-menu>
                            <a href="#">Edit</a>
                            <a href="#">Delete</a>
                        </ks-action-menu>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis leo risus, quis finibus diam venenatis elementum. Sed quis metus ut turpis ornare euismod. Etiam in accumsan justo. Pellentesque leo magna, suscipit et ipsum quis, viverra luctus mauris. In faucibus lacus et egestas tempus. Aliquam erat volutpat. Aenean lobortis erat eget orci auctor iaculis. In quis erat volutpat, blandit dolor non, tempus mi. Nullam hendrerit fringilla arcu, ut ornare velit placerat eu. Cras augue ligula, ultricies at fringilla fringilla, pellentesque sed magna. Praesent ut facilisis metus. Donec eu congue orci. Cras nunc ligula, laoreet ut turpis eget, aliquam convallis elit. Aliquam iaculis metus ac diam ornare, eget molestie enim euismod. Ut non faucibus nunc. Morbi nisl nunc, scelerisque a enim ac, tincidunt varius nulla.</p>

                    <p>Morbi faucibus rutrum mauris, eu lobortis ex aliquam ut. Pellentesque at nulla orci. Curabitur malesuada, risus in porta porttitor, massa magna commodo dui, accumsan euismod lectus velit in mauris. Morbi hendrerit sodales nibh, vitae maximus enim pellentesque id. Morbi in tellus tempor nisi convallis placerat in non justo. Duis egestas aliquam ligula a dictum. Integer vestibulum id ante et tempor. Praesent porta tempor magna, ut lacinia nisl imperdiet et. Ut molestie ac lacus ac vulputate.</p>

                    <p>Etiam congue dictum ante, tincidunt tristique nunc tempus in. Nulla facilisi. Praesent tempor ex vel porta lacinia. Praesent nunc elit, dapibus at lacinia in, blandit vitae elit. Praesent enim justo, fermentum ac vestibulum nec, convallis et nibh. Pellentesque vulputate eu leo nec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat odio a nulla finibus, et faucibus nibh facilisis. Suspendisse cursus, lacus posuere tempus aliquam, felis sapien lobortis nisi, eu posuere dui tortor at risus. Etiam non sem ut dui scelerisque consequat a ut nibh. Aliquam at ante at quam efficitur placerat imperdiet ut lorem.</p>

                    <p>Maecenas pellentesque orci ut mauris mattis egestas. Aliquam non facilisis diam, faucibus molestie magna. Aenean aliquet pulvinar nunc, ac porttitor nisl pellentesque non. Sed semper ante ac varius pellentesque. Suspendisse porta condimentum facilisis. Etiam aliquam elit non ligula tempus, nec dapibus quam mollis. Nulla efficitur vel leo ut cursus. Sed risus nunc, porta pretium fermentum id, gravida ut augue. Sed ut neque sit amet nibh suscipit consectetur. Pellentesque consequat, eros vel interdum tincidunt, nisi quam malesuada ex, ac egestas dui purus feugiat eros. Vivamus vitae sollicitudin sapien. Nullam ultrices varius ultricies. Ut non imperdiet justo, non molestie nisl. Fusce a velit sit amet libero ultricies elementum.</p>

                    <p>Morbi convallis posuere augue non lacinia. Phasellus diam sapien, faucibus in elit vitae, viverra egestas nunc. Quisque in odio porta, rhoncus dolor sit amet, commodo tortor. Maecenas sit amet tellus felis. Ut fringilla, ante quis suscipit interdum, ex arcu iaculis risus, nec bibendum massa mi vel augue. Phasellus eleifend facilisis lectus, ac posuere risus aliquam sit amet. Phasellus ex tortor, tincidunt sed nulla vel, pretium suscipit lorem. Curabitur est diam, auctor et suscipit tincidunt, interdum quis nunc.</p>
                </ks-accordion-row>
                <ks-accordion-row title="Row 2">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis leo risus, quis finibus diam venenatis elementum. Sed quis metus ut turpis ornare euismod. Etiam in accumsan justo. Pellentesque leo magna, suscipit et ipsum quis, viverra luctus mauris. In faucibus lacus et egestas tempus. Aliquam erat volutpat. Aenean lobortis erat eget orci auctor iaculis. In quis erat volutpat, blandit dolor non, tempus mi. Nullam hendrerit fringilla arcu, ut ornare velit placerat eu. Cras augue ligula, ultricies at fringilla fringilla, pellentesque sed magna. Praesent ut facilisis metus. Donec eu congue orci. Cras nunc ligula, laoreet ut turpis eget, aliquam convallis elit. Aliquam iaculis metus ac diam ornare, eget molestie enim euismod. Ut non faucibus nunc. Morbi nisl nunc, scelerisque a enim ac, tincidunt varius nulla.</p>

                    <p>Morbi faucibus rutrum mauris, eu lobortis ex aliquam ut. Pellentesque at nulla orci. Curabitur malesuada, risus in porta porttitor, massa magna commodo dui, accumsan euismod lectus velit in mauris. Morbi hendrerit sodales nibh, vitae maximus enim pellentesque id. Morbi in tellus tempor nisi convallis placerat in non justo. Duis egestas aliquam ligula a dictum. Integer vestibulum id ante et tempor. Praesent porta tempor magna, ut lacinia nisl imperdiet et. Ut molestie ac lacus ac vulputate.</p>

                    <p>Etiam congue dictum ante, tincidunt tristique nunc tempus in. Nulla facilisi. Praesent tempor ex vel porta lacinia. Praesent nunc elit, dapibus at lacinia in, blandit vitae elit. Praesent enim justo, fermentum ac vestibulum nec, convallis et nibh. Pellentesque vulputate eu leo nec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat odio a nulla finibus, et faucibus nibh facilisis. Suspendisse cursus, lacus posuere tempus aliquam, felis sapien lobortis nisi, eu posuere dui tortor at risus. Etiam non sem ut dui scelerisque consequat a ut nibh. Aliquam at ante at quam efficitur placerat imperdiet ut lorem.</p>

                    <p>Maecenas pellentesque orci ut mauris mattis egestas. Aliquam non facilisis diam, faucibus molestie magna. Aenean aliquet pulvinar nunc, ac porttitor nisl pellentesque non. Sed semper ante ac varius pellentesque. Suspendisse porta condimentum facilisis. Etiam aliquam elit non ligula tempus, nec dapibus quam mollis. Nulla efficitur vel leo ut cursus. Sed risus nunc, porta pretium fermentum id, gravida ut augue. Sed ut neque sit amet nibh suscipit consectetur. Pellentesque consequat, eros vel interdum tincidunt, nisi quam malesuada ex, ac egestas dui purus feugiat eros. Vivamus vitae sollicitudin sapien. Nullam ultrices varius ultricies. Ut non imperdiet justo, non molestie nisl. Fusce a velit sit amet libero ultricies elementum.</p>
                </ks-accordion-row>
                <ks-accordion-row title="Row 3">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis leo risus, quis finibus diam venenatis elementum. Sed quis metus ut turpis ornare euismod. Etiam in accumsan justo. Pellentesque leo magna, suscipit et ipsum quis, viverra luctus mauris. In faucibus lacus et egestas tempus. Aliquam erat volutpat. Aenean lobortis erat eget orci auctor iaculis. In quis erat volutpat, blandit dolor non, tempus mi. Nullam hendrerit fringilla arcu, ut ornare velit placerat eu. Cras augue ligula, ultricies at fringilla fringilla, pellentesque sed magna. Praesent ut facilisis metus. Donec eu congue orci. Cras nunc ligula, laoreet ut turpis eget, aliquam convallis elit. Aliquam iaculis metus ac diam ornare, eget molestie enim euismod. Ut non faucibus nunc. Morbi nisl nunc, scelerisque a enim ac, tincidunt varius nulla.</p>

                    <p>Morbi faucibus rutrum mauris, eu lobortis ex aliquam ut. Pellentesque at nulla orci. Curabitur malesuada, risus in porta porttitor, massa magna commodo dui, accumsan euismod lectus velit in mauris. Morbi hendrerit sodales nibh, vitae maximus enim pellentesque id. Morbi in tellus tempor nisi convallis placerat in non justo. Duis egestas aliquam ligula a dictum. Integer vestibulum id ante et tempor. Praesent porta tempor magna, ut lacinia nisl imperdiet et. Ut molestie ac lacus ac vulputate.</p>

                    <p>Etiam congue dictum ante, tincidunt tristique nunc tempus in. Nulla facilisi. Praesent tempor ex vel porta lacinia. Praesent nunc elit, dapibus at lacinia in, blandit vitae elit. Praesent enim justo, fermentum ac vestibulum nec, convallis et nibh. Pellentesque vulputate eu leo nec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat odio a nulla finibus, et faucibus nibh facilisis. Suspendisse cursus, lacus posuere tempus aliquam, felis sapien lobortis nisi, eu posuere dui tortor at risus. Etiam non sem ut dui scelerisque consequat a ut nibh. Aliquam at ante at quam efficitur placerat imperdiet ut lorem.</p>
                </ks-accordion-row>
            </ks-accordion>
        </div>

        <div class="row">
            <code-block>
                <template v-pre>
                    &lt;ks-accordion>
                        &lt;ks-accordion-row title="Row 1">
                            &lt;div slot="actions">
                                &lt;ks-action-menu>
                                    &lt;a href="#">Edit&lt;/a>
                                    &lt;a href="#">Delete&lt;/a>
                                &lt;/ks-action-menu>
                            &lt;/div>

                            Content Here...
                        &lt;/ks-accordion-row>
                        &lt;ks-accordion-row title="Row 2">
                            Content Here...
                        &lt;/ks-accordion-row>
                        &lt;ks-accordion-row title="Row 3">
                            Content Here...
                        &lt;/ks-accordion-row>
                    &lt;/ks-accordion>
                </template>
            </code-block>
        </div>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import KsAccordion from '../../../src/components/KsAccordion.vue';
    import KsAccordionRow from '../../../src/components/KsAccordionRow.vue';
    import KsActionMenu from '../../../src/components/KsActionMenu.vue';

    export default {
        name: 'PageKsAccordion',

        components: {
            KsAccordion,
            KsAccordionRow,
            KsActionMenu
        }
    }
</script>
