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
                    <th>Gutter</th>
                    <td colspan="5">1rem</td>
                </tr>
                </tbody>
            </table>
        </div>

        <h3>No Row Collapse</h3>
        <div class="row col">
            <div class="col tab-6" style="background:#fff;padding:1rem;">
                Here is col 1 of tab grid
            </div>
            <div class="col tab-6" style="background:#fff;padding:1rem;">
                Here is col 2 of tab grid
            </div>
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
                                <td>.row</td>
                                <td>This will just add a row around the columns. This adds a clearfix.</td>
                            </tr>
                            <tr>
                                <td>.{col-prefix}-half</td>
                                <td>This is an alias for .{col-prefix}-6</td>
                            </tr>
                            <tr>
                                <td>.{col-prefix}-quarter</td>
                                <td>This is an alias for .{col-prefix}-3</td>
                            </tr>
                            <tr>
                                <td>.{col-prefix}-full</td>
                                <td>This is an alias for .{col-prefix}-12</td>
                            </tr>
                            <tr>
                                <td>.row-collapse</td>
                                <td>
                                    This is a helper to collapse the row. If the margin on each side is too much or is off, collapsing the row will remove the margin on both sides. This is mainly used when nesting columns.
                                </td>
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