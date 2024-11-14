<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

    import DeleteModal from '$lib/Components/DeleteModal.Component.svelte';

    let deleteModal = $state(false);
	
</script>


<div class="w-full h-auto bg-[#ffffff] dark:bg-[#081c18] p-4 rounded-b-xl">

    <Table striped={true}>
        <TableHead theadClass="bg-white dark:bg-[#212121] text-center">
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y text-center">
                    <TableBodyRow>
                        <TableBodyCell>Payed or financial dues</TableBodyCell>
                        <TableBodyCell>100000</TableBodyCell>
                        <TableBodyCell>22/01/2024</TableBodyCell>
    
                        <TableBodyCell>
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <div class="flex h-auto w-auto items-center justify-center gap-2">
                                

                                    <a href="edit/1" class="bg-green-600 hover:bg-green-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/edit.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                    
                                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                                    <!-- svelte-ignore a11y_missing_attribute -->
                                    <a  class="bg-red-600 hover:bg-red-500 h-12 w-12 p-2 flex justify-center items-center rounded-full" onclick={() => (deleteModal = true)}>
                                        <img src="/images/delete.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                
                            </div>
                        </TableBodyCell>
                    </TableBodyRow>


                    <TableBodyRow>
                        <TableBodyCell>Payed or financial dues</TableBodyCell>
                        <TableBodyCell>230000</TableBodyCell>
                        <TableBodyCell>12/01/2024</TableBodyCell>
    
                        <TableBodyCell>
                            <div class="flex h-auto w-auto items-center justify-center gap-2">
                                

                                    <a href="edit/1" class="bg-green-600 hover:bg-green-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/edit.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                    
                                    <a href="edit/1" class="bg-red-600 hover:bg-red-500 h-12 w-12 p-2 flex justify-center items-center rounded-full" onclick={() => (deleteModal = true)}>
                                        <img src="/images/delete.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                
                            </div>
                        </TableBodyCell>
                    </TableBodyRow>


                    <TableBodyRow>
                        <TableBodyCell>Payed or financial dues</TableBodyCell>
                        <TableBodyCell>50000</TableBodyCell>
                        <TableBodyCell>27/04/2024</TableBodyCell>
    
                        <TableBodyCell>
                            <div class="flex h-auto w-auto items-center justify-center gap-2">
                                

                                    <a href="edit/1" class="bg-green-600 hover:bg-green-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/edit.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                    
                                    <a href="edit/1" class="bg-red-600 hover:bg-red-500 h-12 w-12 p-2 flex justify-center items-center rounded-full" onclick={() => (deleteModal = true)}>
                                        <img src="/images/delete.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                
                            </div>
                        </TableBodyCell>
                    </TableBodyRow>
        </TableBody>
    </Table>
</div>


<!-- <DeleteModal bind:deleteModal={deleteModal} bi/> -->