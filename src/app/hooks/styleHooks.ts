import { useMediaQuery } from "@mui/material";
import { useMemo } from "react";

export function useDamageButtonStyle() {
  const minWidth = useMediaQuery("(min-width: 1024px");

  const damageButtonStyle = useMemo(() => {
    return minWidth
      ? { height: 10 }
      : { height: 10}
  }, [minWidth])

  return { damageButtonStyle }
}

export function useTokenImageStyle() {
  const minWidth = useMediaQuery("(min-width: 1024px)");

  const largeTokenStyle = useMemo(() => {
    return minWidth
      ? { height: 116, width: 116}
      : { height: 116, width: 116}
  }, [minWidth])

  const mediumTokenStyle = useMemo(() => {
    return minWidth
      ? { height: 116, width: 116}
      : { height: 116, width: 116}
  }, [minWidth])

  const smallTokenStyle = useMemo(() => {
    return minWidth
      ? { height: 116, width: 116}
      : { height: 116, width: 116}
  }, [ minWidth])

  return { largeTokenStyle, mediumTokenStyle, smallTokenStyle }
}