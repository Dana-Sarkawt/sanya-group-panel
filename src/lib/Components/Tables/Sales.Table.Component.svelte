<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	
</script>


<div class="w-full h-auto bg-[#ffffff] dark:bg-[#081c18] p-4 rounded-b-xl">

    <Table striped={true}>
        <TableHead theadClass="bg-white dark:bg-[#212121] text-center">
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>New Action</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y text-center">
                    <TableBodyRow>
                        <TableBodyCell>Description about Sales</TableBodyCell>



                        <TableBodyCell>
                            <div class="w-full h-auto flex justify-center items-center gap-2">
                                <div class="w-28 h-6 flex justify-center items-center bg-orange-500 rounded-full px-4 font-bold">
                                    Deposit
                                </div>

                                <div class="w-28 h-6 flex justify-center items-center bg-blue-400 rounded-full px-4 font-bold">
                                    Financial Dues
                                </div>
                            </div>

                        </TableBodyCell>
    
                        <TableBodyCell>
                            <div class="flex h-auto w-auto items-center justify-center gap-2">
                                

                                    <a href="edit/1" class="bg-green-600 hover:bg-green-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/edit.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                    
                                    <a href="edit/1" class="bg-red-600 hover:bg-red-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/delete.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                
                            </div>
                        </TableBodyCell>
                    </TableBodyRow>




                    <TableBodyRow>
                        <TableBodyCell>Description about Sales</TableBodyCell>


                        <TableBodyCell>
                            <div class="w-full h-auto flex justify-center items-center gap-2">
                                <div class="w-28 h-6 flex justify-center items-center bg-orange-500 rounded-full px-4 font-bold">
                                    Deposit
                                </div>

                                <div class="w-28 h-6 flex justify-center items-center bg-blue-400 rounded-full px-4 font-bold">
                                    Financial Dues
                                </div>
                            </div>

                        </TableBodyCell>
    
                        <TableBodyCell>
                            <div class="flex h-auto w-auto items-center justify-center gap-2">
                                

                                    <a href="edit/1" class="bg-green-600 hover:bg-green-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/edit.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                    
                                    <a href="edit/1" class="bg-red-600 hover:bg-red-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/delete.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                
                            </div>
                        </TableBodyCell>
                    </TableBodyRow>


                    <TableBodyRow>
                        <TableBodyCell>Description about Sales</TableBodyCell>


                        <TableBodyCell>
                            <div class="w-full h-auto flex justify-center items-center gap-2">
                                <div class="w-28 h-6 flex justify-center items-center bg-orange-500 rounded-full px-4 font-bold">
                                    Deposit
                                </div>

                                <div class="w-28 h-6 flex justify-center items-center bg-blue-400 rounded-full px-4 font-bold">
                                    Financial Dues
                                </div>
                            </div>

                        </TableBodyCell>
    
                        <TableBodyCell>
                            <div class="flex h-auto w-auto items-center justify-center gap-2">
                                

                                    <a href="edit/1" class="bg-green-600 hover:bg-green-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/edit.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                    
                                    <a href="edit/1" class="bg-red-600 hover:bg-red-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/delete.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                
                            </div>
                        </TableBodyCell>
                    </TableBodyRow>
        </TableBody>
    </Table>
</div>
