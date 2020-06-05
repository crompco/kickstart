<template>
    <div>
        <div class="row">
            <h2>Grid</h2>
        </div>

        <div class="row">
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Small <br> <small>480px</small></th>
                        <th>Tablet <br> <small>768px</small></th>
                        <th>Medium Screen <br> <small>1024px</small></th>
                        <th>Large Screen <br> <small>1224px</small></th>
                        <th>Extra Large Screen <br> <small>1400px</small></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th># of columns</th>
                        <td colspan="5">12</td>
                    </tr>
                    <tr>
                        <th>Column prefix</th>
                        <td>.sm-</td>
                        <td>.tab-</td>
                        <td>.med-</td>
                        <td>.lg-</td>
                        <td>.xlg-</td>
                    </tr>
                    <tr>
                        <th>Push</th>
                        <td>.sm-push-</td>
                        <td>.tab-push-</td>
                        <td>.med-push-</td>
                        <td>.lg-push-</td>
                        <td>.xlg-push-</td>
                    </tr>
                    <tr>
                        <th>Gutter</th>
                        <td colspan="5">1rem</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="row">
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Small <br> <small>480px</small></th>
                        <th>Tablet <br> <small>768px</small></th>
                        <th>Medium Screen <br> <small>1024px</small></th>
                        <th>Large Screen <br> <small>1224px</small></th>
                        <th>Extra Large Screen <br> <small>1400px</small></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>.sm-show</th>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                    </tr>
                    <tr>
                        <th>.tab-show</th>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                    </tr>
                    <tr>
                        <th>.med-show</th>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                    </tr>
                    <tr>
                        <th>.lg-show</th>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:#ddd;">Hidden</td>
                    </tr>
                    <tr>
                        <th style="border-bottom:2px solid #aaa;">.xlg-show</th>
                        <td style="border-bottom:2px solid #aaa; background-color:#ddd;">Hidden</td>
                        <td style="border-bottom:2px solid #aaa; background-color:#ddd;">Hidden</td>
                        <td style="border-bottom:2px solid #aaa; background-color:#ddd;">Hidden</td>
                        <td style="border-bottom:2px solid #aaa; background-color:#ddd;">Hidden</td>
                        <td style="border-bottom:2px solid #aaa; background-color:lightgreen;">Visible</td>
                    </tr>
                    <tr>
                        <th>.sm-hide</th>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                    </tr>
                    <tr>
                        <th>.tab-hide</th>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                    </tr>
                    <tr>
                        <th>.med-hide</th>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                    </tr>
                    <tr>
                        <th>.lg-hide</th>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:lightgreen;">Visible</td>
                    </tr>
                    <tr>
                        <th style="border-bottom:2px solid #aaa;">.xlg-hide</th>
                        <td style="border-bottom:2px solid #aaa;background-color:lightgreen;">Visible</td>
                        <td style="border-bottom:2px solid #aaa;background-color:lightgreen;">Visible</td>
                        <td style="border-bottom:2px solid #aaa;background-color:lightgreen;">Visible</td>
                        <td style="border-bottom:2px solid #aaa;background-color:lightgreen;">Visible</td>
                        <td style="border-bottom:2px solid #aaa;background-color:#ddd;">Hidden</td>
                    </tr>
                    <tr>
                        <th>.tab-hide-down</th>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                    </tr>
                    <tr>
                        <th>.med-hide-down</th>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                    </tr>
                    <tr>
                        <th>.lg-hide-down</th>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:lightgreen;">Visible</td>
                    </tr>
                    <tr>
                        <th>.tab-hide-up</th>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                    </tr>
                    <tr>
                        <th>.med-hide-up</th>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:#ddd;">Hidden</td>
                        <td style="background-color:#ddd;">Hidden</td>
                    </tr>
                    <tr>
                        <th>.lg-hide-up</th>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:lightgreen;">Visible</td>
                        <td style="background-color:#ddd;">Hidden</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>No Row Collapse</h3>
        <div class="row col">
            <div class="col tab-6 tab-hide-up" style="background:#fff;padding:1rem;">
                Here is col 1 of tab grid
            </div>
            <div class="col tab-6" style="background:#fff;padding:1rem;">
                Here is col 2 of tab grid
            </div>
            <div class="col tab-6 tab-push-2">I am pushed over 2 columns above tab breakpoint</div>
        </div>
        <div>
            <code-block>
                <template v-pre>
                &lt;div class="row col">
                    &lt;div class="col tab-6" style="background:#fff;padding:1rem;">
                        Here is col 1 of tab grid
                    &lt;/div>
                    &lt;div class="col tab-6" style="background:#fff;padding:1rem;">
                        Here is col 2 of tab grid
                    &lt;/div>
                &lt;/div>
                </template>
            </code-block>
        </div>

        <h3>Row Collapse</h3>
        <div class="row col row-collapse">
            <div class="col tab-6" style="background:#fff;padding:1rem;">
                Here is col 1 of tab grid
            </div>
            <div class="col tab-6" style="background:#fff;padding:1rem;">
                Here is col 2 of tab grid
            </div>
        </div>
        <div class="row">
            <div class="col">
                <code-block>
                    <template v-pre>
                    &lt;div class="row col row-collapse">
                        &lt;div class="col tab-6" style="background:#fff;padding:1rem;">
                            Here is col 1 of tab grid
                        &lt;/div>
                        &lt;div class="col tab-6" style="background:#fff;padding:1rem;">
                            Here is col 2 of tab grid
                        &lt;/div>
                    &lt;/div>
                    </template>
                </code-block>
            </div>
        </div>

        <div class="row">
            <ks-tabs>
                <ks-tab title="Helpers">
                    <table class="table striped">
                        <thead>
                            <tr>
                                <th>Class</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><pre>.row</pre></td>
                                <td>This will just add a row around the columns. This adds a clearfix.</td>
                            </tr>
                            <tr>
                                <td><pre>.col</pre></td>
                                <td>
                                    This will add a margin bottom to the element. For use in page layouts. <br/>
                                    *Note the form-group class for laying out form elements will automatically attach this margin for you
                                </td>
                            </tr>
                            <tr>
                                <td><pre>.{col-prefix}-half</pre></td>
                                <td>This is an alias for .{col-prefix}-6</td>
                            </tr>
                            <tr>
                                <td><pre>.{col-prefix}-quarter</pre></td>
                                <td>This is an alias for .{col-prefix}-3</td>
                            </tr>
                            <tr>
                                <td><pre>.{col-prefix}-full</pre></td>
                                <td>This is an alias for .{col-prefix}-12</td>
                            </tr>
                            <tr>
                                <td><pre>.row-collapse</pre></td>
                                <td>
                                    This is a helper to collapse the row. If the margin on each side is too much or is off, collapsing the row will remove the margin on both sides. This is mainly used when nesting columns.
                                </td>
                            </tr>
                        <tr>
                            <td><pre>.collapse</pre></td>
                            <td>Removes an elements padding left and right. Similar to .row-collapse but doesn't change with or margin.</td>
                        </tr>
                        </tbody>
                    </table>
                </ks-tab>
            </ks-tabs>
        </div>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies

    export default {
        name: 'PageKsGrid'
    }
</script>
