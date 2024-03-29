import {ReactElement, useEffect, useState} from "react";
import SelectBox from "./SelectBox";
import "./style/stats.scss"
import {useFetch} from "../../hooks/useFetch";
import {getValidLaps} from "../../services/lapsService";
import {Table} from "../../components/table/Table";
import {fullDatetimeFormat} from "../../utils/dateFormatter";
import {useLocation, useNavigate} from "react-router-dom";
import {Pagination} from "../../components/pagination/Pagination";

export function Stats(): ReactElement {
    const location = useLocation()
    const navigate = useNavigate()
    const queryParams: URLSearchParams = new URLSearchParams(location.search)

    const page: number = Number(queryParams.get("page"))
    const track: string = queryParams.get("track") ?? ""
    const car: string = queryParams.get("car") ?? ""

    const [laps, setLaps] = useState<ILapLeaderboard[]>([])
    const [pagination, setPagination] = useState<IPaginationSB | undefined>()

    const lapsExist: boolean = laps && laps.length > 0
    const isReadyToFetch: boolean = car !== "" || track !== ""

    const filterDefaults: IPageRequest = {
        sort: "laptime",
        direction: "asc",
        page: 0,
        size: 5
    }

    const {data, isLoading, isSuccess, isError, error} = useFetch(getValidLaps, [queryParams.toString()], isReadyToFetch, [page, car, track])

    function toLapsTableFormat(laps: ILapLeaderboard[]): ILapLeaderboard[] {
        return laps.map(lap => ({...lap, date: fullDatetimeFormat(lap.date)}))
    }

    function handleFilterUpdate(update: {[key: string]: string | number}): void {
        for (const key in update) {
            queryParams.set(key, String(update[key]))
        }
        navigate({search: queryParams.toString()})
    }

    function handleCarTrackChange(car: string, track: string): void {
        handlePaging(0)
        handleFilterUpdate({car, track})
    }

    function handlePaging(page: number): void {
        handleFilterUpdate({page})
    }

    function handleFetchedData(data: IPageResponse<ILapLeaderboard[]>): void {
        setLaps(data.content)
        setPagination({
            size: data.size,
            number: data.number,
            totalPages: data.totalPages,
            totalElements: data.totalElements
        })
    }

    function handleTableBodyRowClick(e: any): void {
        const id: string = e.target.parentNode.getAttribute("data-id")

        if (e.button === 0) navigate("/lap/" + id)
        if (e.button === 1) window.open("/lap/" + id, "_blank")
    }

    function setDefaultParams(): void {
        const filterDefaultsKeys = Object.keys(filterDefaults) as (keyof IPageRequest)[]
        const allParamsPresent: boolean = filterDefaultsKeys.every(key => queryParams.has(key))

        if (!allParamsPresent) {
            filterDefaultsKeys.forEach((key) => {
                queryParams.set(key, String(filterDefaults[key]))
            })

            queryParams.set("sort", queryParams.get("sort") + ',' + queryParams.get("direction"))
            queryParams.delete("direction")
        }
    }

    useEffect(() => {
        setDefaultParams()
    }, [])

    useEffect(() => {
        if (data) handleFetchedData(data)
    }, [data])

    return (
        <article className="stats">
            <SelectBox setCarTrack={handleCarTrackChange}/>
            {isSuccess && lapsExist && <>
            <Table pagination={pagination!} data={toLapsTableFormat(laps)} type="stats" handleBodyRowClick={handleTableBodyRowClick}/>
            <Pagination pagination={pagination!} handlePaging={handlePaging}/></>
            }
            {isSuccess && !lapsExist  &&
            <p className="message">No laps recorded</p>}
            {isError && <span className="error">{error}</span>}
            {isLoading && <span className="loading">Loading...</span>}
        </article>
    )
}