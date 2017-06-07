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

        <div>
            <div class="col tab-6" style="background:#fff;padding:1rem;">
                Here is col 1 of tab grid
            </div>
            <div class="col tab-6" style="background:#fff;padding:1rem;">
                Here is col 2 of tab grid
            </div>
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