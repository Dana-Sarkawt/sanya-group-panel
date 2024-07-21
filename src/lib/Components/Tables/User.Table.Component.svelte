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


    <Table striped={true}>
        <TableHead theadClass="bg-white dark:bg-[#212121]">
            <TableHeadCell>Apollo ID</TableHeadCell>
            <TableHeadCell>Apollo Name</TableHeadCell>
            <TableHeadCell>Owner Name</TableHeadCell>
            <TableHeadCell>Physical Address</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y">
                    <TableBodyRow>
                        <TableBodyCell>12</TableBodyCell>
                        <TableBodyCell>df</TableBodyCell>
                        <TableBodyCell>
                            <div class="justfiy-center flex h-auto w-auto items-center gap-2">
                                <img src="/images/photo.png" class="h-10 w-10 rounded-lg object-contain" alt="" />
                                <p>hjghj</p>
                            </div>
                        </TableBodyCell>
                        <TableBodyCell>yyuyu</TableBodyCell>
                        <TableBodyCell
                            tdClass="px-6 py-4 whitespace-nowrap font-medium  flex justify-center items-center"
                        >
                            <div
                                class="justfiy-center flex h-8 w-28 items-center rounded-full  px-2"
                            >
                                <p
                                    class="w-24"
                                >
                                    jkjkjk
                                </p>
                            </div>
                        </TableBodyCell>
    
                        <TableBodyCell>
                            <div class="flex h-auto w-auto items-center justify-center gap-2">
                                
                                    <a href="edit/1">
                                        <img src="/images/edit.png" class="h-6 w-6 object-contain" alt="" />
                                    </a>
                                
                            </div>
                        </TableBodyCell>
                    </TableBodyRow>
        </TableBody>
    </Table>
