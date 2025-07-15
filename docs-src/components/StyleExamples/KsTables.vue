<template>
    <div>
        <div class="basic-block">
            <table class="ks-table responsive">
                <thead>
                <tr>
                    <th>First</th>
                    <th>Second</th>
                    <th>Third</th>
                    <th>Fourth</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td data-title="First">10</td>
                    <td data-title="Second">Lorem ipsum dolor sit amet</td>
                    <td data-title="Third">Lorem ipsum</td>
                    <td data-title="Fourth">Lorem</td>
                </tr>
                <tr>
                    <td data-title="First">10</td>
                    <td data-title="Second">Lorem ipsum dolor sit amet</td>
                    <td data-title="Third">Lorem ipsum</td>
                    <td data-title="Fourth">Lorem</td>
                </tr>
                <tr>
                    <td data-title="First">10</td>
                    <td data-title="Second">Lorem ipsum dolor sit amet</td>
                    <td data-title="Third">Lorem ipsum</td>
                    <td data-title="Fourth">Lorem</td>
                </tr>
                <tr>
                    <td data-title="First">10</td>
                    <td data-title="Second">Lorem ipsum dolor sit amet</td>
                    <td data-title="Third">Lorem ipsum</td>
                    <td data-title="Fourth">Lorem</td>
                </tr>
                </tbody>
            </table>

            <div>
                <code-block>
                    <template v-pre>
                        &lt;table class="ks-table responsive">
                            &lt;thead>
                                &lt;tr>
                                    &lt;th>First&lt;/th>
                                    &lt;th>Second&lt;/th>
                                    &lt;th>Third&lt;/th>
                                    &lt;th>Fourth&lt;/th>
                                &lt;/tr>
                            &lt;/thead>
                            &lt;tbody>
                                &lt;tr>
                                    &lt;td data-title="First">10&lt;/td>
                                    &lt;td data-title="Second">Lorem ipsum dolor sit amet&lt;/td>
                                    &lt;td data-title="Third">Lorem ipsum&lt;/td>
                                    &lt;td data-title="Fourth">Lorem&lt;/td>
                                &lt;/tr>
                                &lt;tr>
                                    &lt;td data-title="First">10&lt;/td>
                                    &lt;td data-title="Second">Lorem ipsum dolor sit amet&lt;/td>
                                    &lt;td data-title="Third">Lorem ipsum&lt;/td>
                                    &lt;td data-title="Fourth">Lorem&lt;/td>
                                &lt;/tr>
                                &lt;tr>
                                    &lt;td data-title="First">10&lt;/td>
                                    &lt;td data-title="Second">Lorem ipsum dolor sit amet&lt;/td>
                                    &lt;td data-title="Third">Lorem ipsum&lt;/td>
                                    &lt;td data-title="Fourth">Lorem&lt;/td>
                                &lt;/tr>
                                &lt;tr>
                                    &lt;td data-title="First">10&lt;/td>
                                    &lt;td data-title="Second">Lorem ipsum dolor sit amet&lt;/td>
                                    &lt;td data-title="Third">Lorem ipsum&lt;/td>
                                    &lt;td data-title="Fourth">Lorem&lt;/td>
                                &lt;/tr>
                            &lt;/tbody>
                        &lt;/table>
                    </template>
                </code-block>
            </div>
        </div>

        <div class="basic-block">
            <div class="ks-scroll-table">
                <table class="ks-table striped">
                    <thead>
                    <tr>
                        <th>First</th>
                        <th>Second</th>
                        <th>Third</th>
                        <th>Fourth</th>
                        <th>Fifth</th>
                        <th>Sixth</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td data-title="First">10</td>
                        <td data-title="Second">Lorem ipsum dolor sit amet</td>
                        <td data-title="Third">Lorem ipsum</td>
                        <td data-title="Fourth">Lorem</td>
                        <td data-title="Fifth">Lorem ipsum dolor sit amet</td>
                        <td data-title="Sixth">Lorem ipsum dolor sit amet</td>
                        <td>
                            <ks-action-menu>
                                <a href="#" @click.prevent="action('New')" class="list-item">New</a>
                                <a href="#" @click.prevent="action('Add')" class="list-item">Add</a>
                                <a href="#" @click.prevent="action('Edit')" class="list-item disabled">Edit</a>
                                <a href="#" @click.prevent="action('Delete')" class="list-item separator danger">Delete Class Link</a>
                            </ks-action-menu>
                        </td>
                    </tr>
                    <tr>
                        <td data-title="First">10</td>
                        <td data-title="Second">Lorem ipsum dolor sit amet</td>
                        <td data-title="Third">Lorem ipsum</td>
                        <td data-title="Fourth">Lorem</td>
                        <td data-title="Fifth">Lorem ipsum dolor sit amet</td>
                        <td data-title="Sixth">Lorem ipsum dolor sit amet</td>
                        <td>
                            <ks-action-menu>
                                <a href="#" @click.prevent="action('New')" class="list-item">New</a>
                                <a href="#" @click.prevent="action('Add')" class="list-item">Add</a>
                                <a href="#" @click.prevent="action('Edit')" class="list-item disabled">Edit</a>
                                <a href="#" @click.prevent="action('Delete')" class="list-item separator danger">Delete Class Link</a>
                            </ks-action-menu>
                        </td>
                    </tr>
                    <tr>
                        <td data-title="First">10</td>
                        <td data-title="Second">Lorem ipsum dolor sit amet</td>
                        <td data-title="Third">Lorem ipsum</td>
                        <td data-title="Fourth">Lorem</td>
                        <td data-title="Fifth">Lorem ipsum dolor sit amet</td>
                        <td data-title="Sixth">Lorem ipsum dolor sit amet</td>
                        <td>
                            <ks-action-menu>
                                <a href="#" @click.prevent="action('New')" class="list-item">New</a>
                                <a href="#" @click.prevent="action('Add')" class="list-item">Add</a>
                                <a href="#" @click.prevent="action('Edit')" class="list-item disabled">Edit</a>
                                <a href="#" @click.prevent="action('Delete')" class="list-item separator danger">Delete Class Link</a>
                            </ks-action-menu>
                        </td>
                    </tr>
                    <tr>
                        <td data-title="First">10</td>
                        <td data-title="Second">Lorem ipsum dolor sit amet</td>
                        <td data-title="Third">Lorem ipsum</td>
                        <td data-title="Fourth">Lorem</td>
                        <td data-title="Fifth">Lorem ipsum dolor sit amet</td>
                        <td data-title="Sixth">Lorem ipsum dolor sit amet</td>
                        <td>
                            <ks-action-menu>
                                <a href="#" @click.prevent="action('New')" class="list-item">New</a>
                                <a href="#" @click.prevent="action('Add')" class="list-item">Add</a>
                                <a href="#" @click.prevent="action('Edit')" class="list-item disabled">Edit</a>
                                <a href="#" @click.prevent="action('Delete')" class="list-item separator danger">Delete Class Link</a>
                            </ks-action-menu>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div>
                    <code-block>
                        <template v-pre>
                            &lt;table class="ks-table striped">
                                &lt;thead>
                                    &lt;tr>
                                        &lt;th>First&lt;/th>
                                        &lt;th>Second&lt;/th>
                                        &lt;th>Third&lt;/th>
                                        &lt;th>Fourth&lt;/th>
                                        &lt;th>Fifth&lt;/th>
                                        &lt;th>Sixth&lt;/th>
                                    &lt;/tr>
                                &lt;/thead>
                                &lt;tbody>
                                    &lt;tr>
                                        &lt;td>10&lt;/td>
                                        &lt;td>Lorem ipsum dolor sit amet&lt;/td>
                                        &lt;td>Lorem ipsum&lt;/td>
                                        &lt;td>Lorem&lt;/td>
                                        &lt;td>Lorem ipsum dolor sit amet&lt;/td>
                                        &lt;td>Lorem ipsum dolor sit amet&lt;/td>
                                    &lt;/tr>
                                    &lt;tr>
                                        &lt;td>10&lt;/td>
                                        &lt;td>Lorem ipsum dolor sit amet&lt;/td>
                                        &lt;td>Lorem ipsum&lt;/td>
                                        &lt;td>Lorem&lt;/td>
                                        &lt;td>Lorem ipsum dolor sit amet&lt;/td>
                                        &lt;td>Lorem ipsum dolor sit amet&lt;/td>
                                    &lt;/tr>
                                    &lt;tr>
                                        &lt;td>10&lt;/td>
                                        &lt;td>Lorem ipsum dolor sit amet&lt;/td>
                                        &lt;td>Lorem ipsum&lt;/td>
                                        &lt;td>Lorem&lt;/td>
                                        &lt;td>Lorem ipsum dolor sit amet&lt;/td>
                                        &lt;td>Lorem ipsum dolor sit amet&lt;/td>
                                    &lt;/tr>
                                    &lt;tr>
                                        &lt;td>10&lt;/td>
                                        &lt;td>Lorem ipsum dolor sit amet&lt;/td>
                                        &lt;td>Lorem ipsum&lt;/td>
                                        &lt;td>Lorem&lt;/td>
                                        &lt;td>Lorem ipsum dolor sit amet&lt;/td>
                                        &lt;td>Lorem ipsum dolor sit amet&lt;/td>
                                    &lt;/tr>
                                &lt;/tbody>
                            &lt;/table>
                        </template>
                    </code-block>
                </div>
            </div>
        </div>

        <div class="basic-block">
            <table class="ks-table bordered">
                <thead>
                <tr>
                    <th>First</th>
                    <th>Second</th>
                    <th>Third</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>20</td>
                    <td>20</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>30</td>
                    <td>30</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>40</td>
                    <td>40</td>
                    <td>40</td>
                </tr>
                </tbody>
            </table>

            <div>
                <code-block>
                    <template v-pre>
                        &lt;table class="ks-table bordered">
                            &lt;thead>
                                &lt;tr>
                                    &lt;th>First&lt;/th>
                                    &lt;th>Second&lt;/th>
                                    &lt;th>Third&lt;/th>
                                &lt;/tr>
                            &lt;/thead>
                            &lt;tbody>
                                &lt;tr>
                                    &lt;td>10&lt;/td>
                                    &lt;td>10&lt;/td>
                                    &lt;td>10&lt;/td>
                                &lt;/tr>
                                &lt;tr>
                                    &lt;td>20&lt;/td>
                                    &lt;td>20&lt;/td>
                                    &lt;td>20&lt;/td>
                                &lt;/tr>
                                &lt;tr>
                                    &lt;td>30&lt;/td>
                                    &lt;td>30&lt;/td>
                                    &lt;td>30&lt;/td>
                                &lt;/tr>
                                &lt;tr>
                                    &lt;td>40&lt;/td>
                                    &lt;td>40&lt;/td>
                                    &lt;td>40&lt;/td>
                                &lt;/tr>
                            &lt;/tbody>
                        &lt;/table>
                    </template>
                </code-block>
            </div>
        </div>

        <div class="basic-block">
            <table class="ks-table shadow">
                <thead>
                <tr>
                    <th>First</th>
                    <th>Second</th>
                    <th>Third</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>20</td>
                    <td>20</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>30</td>
                    <td>30</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>40</td>
                    <td>40</td>
                    <td>40</td>
                </tr>
                </tbody>
            </table>
            <div>
                <code-block>
                    <template v-pre>
                        &lt;table class="ks-table shadow">
                            &lt;thead>
                                &lt;tr>
                                    &lt;th>First&lt;/th>
                                    &lt;th>Second&lt;/th>
                                    &lt;th>Third&lt;/th>
                                &lt;/tr>
                            &lt;/thead>
                            &lt;tbody>
                                &lt;tr>
                                    &lt;td>10&lt;/td>
                                    &lt;td>10&lt;/td>
                                    &lt;td>10&lt;/td>
                                &lt;/tr>
                                &lt;tr>
                                    &lt;td>20&lt;/td>
                                    &lt;td>20&lt;/td>
                                    &lt;td>20&lt;/td>
                                &lt;/tr>
                                &lt;tr>
                                    &lt;td>30&lt;/td>
                                    &lt;td>30&lt;/td>
                                    &lt;td>30&lt;/td>
                                &lt;/tr>
                                &lt;tr>
                                    &lt;td>40&lt;/td>
                                    &lt;td>40&lt;/td>
                                    &lt;td>40&lt;/td>
                                &lt;/tr>
                            &lt;/tbody>
                        &lt;/table>
                    </template>
                </code-block>
            </div>
        </div>

        <div class="basic-block">
            <table class="ks-table primary bordered striped">
                <thead>
                <tr>
                    <th>First</th>
                    <th>Second</th>
                    <th>Third</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>20</td>
                    <td>20</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>30</td>
                    <td>30</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>40</td>
                    <td>40</td>
                    <td>40</td>
                </tr>
                </tbody>
            </table>
            <div>
                <code-block>
                    <template v-pre>
                        &lt;table class="ks-table primary bordered striped">
                            &lt;thead>
                                &lt;tr>
                                    &lt;th>First&lt;/th>
                                    &lt;th>Second&lt;/th>
                                    &lt;th>Third&lt;/th>
                                &lt;/tr>
                            &lt;/thead>
                            &lt;tbody>
                                &lt;tr>
                                    &lt;td>10&lt;/td>
                                    &lt;td>10&lt;/td>
                                    &lt;td>10&lt;/td>
                                &lt;/tr>
                                &lt;tr>
                                    &lt;td>20&lt;/td>
                                    &lt;td>20&lt;/td>
                                    &lt;td>20&lt;/td>
                                &lt;/tr>
                                &lt;tr>
                                    &lt;td>30&lt;/td>
                                    &lt;td>30&lt;/td>
                                    &lt;td>30&lt;/td>
                                &lt;/tr>
                                &lt;tr>
                                    &lt;td>40&lt;/td>
                                    &lt;td>40&lt;/td>
                                    &lt;td>40&lt;/td>
                                &lt;/tr>
                            &lt;/tbody>
                        &lt;/table>
                    </template>
                </code-block>
            </div>
        </div>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import KsActionMenu from '../../../src/components/KsActionMenu.vue';

    export default {
        name: 'Tables',

        components: {
            KsActionMenu
        }
    }
</script>
